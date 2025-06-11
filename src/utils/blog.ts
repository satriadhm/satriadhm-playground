
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: number;
  slug: string;
  featured: boolean;
  content: string;
  author: string;
  tags: string[];
  image?: string;
}

export interface BlogMetadata {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: number;
  featured: boolean;
  author: string;
  tags: string[];
  image?: string;
}

interface TableCell {
  content: string;
  isHeader: boolean;
  alignment?: 'left' | 'center' | 'right';
}

interface TableRow {
  cells: TableCell[];
}

interface ParsedTable {
  rows: TableRow[];
  hasHeader: boolean;
}

/**
 * Main function to parse markdown content to HTML with Tailwind for structure and CSS for code highlighting
 */
export function parseMarkdown(markdown: string): string {
  if (!markdown || typeof markdown !== 'string') {
    return '<p class="mb-4 text-slate-700 dark:text-slate-300">No content available</p>';
  }

  try {
    return processMarkdownContent(markdown);
  } catch (error) {
    console.error('Markdown parsing error:', error);
    return `<p class="mb-4 text-slate-700 dark:text-slate-300">${escapeHtml(markdown)}</p>`;
  }
}

/**
 * Process the complete markdown content
 */
function processMarkdownContent(text: string): string {
  const lines = text.split('\n');
  const result: string[] = [];
  let inCodeBlock = false;
  let codeLanguage = '';
  let codeContent: string[] = [];
  let tableBuffer: string[] = [];
  let inUnorderedList = false;
  let inOrderedList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Handle code blocks
    if (line.startsWith('```')) {
      // Close any open list before starting a code block
      if (inUnorderedList) {
        result.push('</ul>');
        inUnorderedList = false;
      }
      if (inOrderedList) {
        result.push('</ol>');
        inOrderedList = false;
      }
      if (inCodeBlock) {
        // End code block
        result.push(createCodeBlock(codeContent.join('\n'), codeLanguage));
        inCodeBlock = false;
        codeLanguage = '';
        codeContent = [];
      } else {
        // Process any pending table before starting code block
        if (tableBuffer.length > 0) {
          result.push(processTableBuffer(tableBuffer));
          tableBuffer = [];
        }
        // Start code block
        inCodeBlock = true;
        codeLanguage = line.substring(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeContent.push(line);
      continue;
    }

    // Handle table rows
    if (isTableRow(line)) {
      // Close any open list before starting a table
      if (inUnorderedList) {
        result.push('</ul>');
        inUnorderedList = false;
      }
      if (inOrderedList) {
        result.push('</ol>');
        inOrderedList = false;
      }
      tableBuffer.push(line);
      continue;
    } else if (tableBuffer.length > 0) {
      // End of table - process the buffered table
      result.push(processTableBuffer(tableBuffer));
      tableBuffer = [];
    }

    // Handle lists context
    const listItemMatch = trimmedLineStartsWithListItem(line);
    if (listItemMatch) {
        // Close other type of list if open
        if (inUnorderedList && listItemMatch.type === 'ordered') {
            result.push('</ul>');
            inUnorderedList = false;
        } else if (inOrderedList && listItemMatch.type === 'unordered') {
            result.push('</ol>');
            inOrderedList = false;
        }

        // Start new list if not already in one
        if (listItemMatch.type === 'unordered' && !inUnorderedList) {
            result.push('<ul class="list-disc pl-5 mb-4 space-y-2 text-slate-700 dark:text-slate-300">');
            inUnorderedList = true;
        } else if (listItemMatch.type === 'ordered' && !inOrderedList) {
            result.push('<ol class="list-decimal pl-5 mb-4 space-y-2 text-slate-700 dark:text-slate-300">');
            inOrderedList = true;
        }

        // Add list item with Tailwind classes
        result.push(`<li class="leading-relaxed text-slate-700 dark:text-slate-300">${processInlineFormatting(listItemMatch.content)}</li>`);
    } else {
        // If not a list item, close any open list
        if (inUnorderedList) {
            result.push('</ul>');
            inUnorderedList = false;
        }
        if (inOrderedList) {
            result.push('</ol>');
            inOrderedList = false;
        }
        const processedLine = processRegularLine(line);
        if (processedLine.trim()) {
            result.push(processedLine);
        }
    }
  }

  // Handle any remaining table at end of content
  if (tableBuffer.length > 0) {
    result.push(processTableBuffer(tableBuffer));
  }

  // Close any open list at the end of the document
  if (inUnorderedList) {
      result.push('</ul>');
  }
  if (inOrderedList) {
      result.push('</ol>');
  }

  return result.join('\n');
}

// Helper to check if a line starts with a list item for better list parsing
function trimmedLineStartsWithListItem(line: string): { type: 'unordered' | 'ordered', content: string } | null {
  const trimmed = line.trim();
  if (trimmed.startsWith('- ')) {
      return { type: 'unordered', content: trimmed.substring(2) };
  }
  const orderedMatch = trimmed.match(/^(\d+)\.\s/);
  if (orderedMatch) {
      return { type: 'ordered', content: trimmed.substring(orderedMatch[0].length) };
  }
  return null;
}

/**
 * Check if a line is part of a table
 */
function isTableRow(line: string): boolean {
  const trimmed = line.trim();
  return trimmed.includes('|') &&
         !trimmed.startsWith('#') &&
         !trimmed.startsWith('```') &&
         !trimmed.match(/^\s*[-\s:]+$/) &&
         !trimmed.match(/^(\d+)\.\s/) &&
         !trimmed.startsWith('- ');
}

/**
 * Process a buffer of table lines
 */
function processTableBuffer(tableLines: string[]): string {
  if (tableLines.length === 0) return '';

  const parsedTable = parseTableRows(tableLines);
  return renderTable(parsedTable);
}

/**
 * Parse table rows from markdown lines
 */
function parseTableRows(lines: string[]): ParsedTable {
  const rows: TableRow[] = [];
  let hasHeader = false;
  let alignments: ('left' | 'center' | 'right')[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (!line) continue;

    if (isSeparatorRow(line)) {
      alignments = parseSeparatorRow(line);
      hasHeader = true;
      continue;
    }

    const cells = parseTableCells(line);
    const isHeaderRow = i === 0 && !hasHeader;
    
    const tableRow: TableRow = {
      cells: cells.map((cellContent, index) => ({
        content: cellContent,
        isHeader: isHeaderRow,
        alignment: alignments[index] || 'left'
      }))
    };

    rows.push(tableRow);
  }

  return { rows, hasHeader };
}

/**
 * Check if a line is a table separator row
 */
function isSeparatorRow(line: string): boolean {
  const trimmed = line.trim();
  return /^\|?(\s*:?-+:?\s*\|)+\s*:?-+:?\s*\|?$/.test(trimmed);
}

/**
 * Parse alignment from separator row
 */
function parseSeparatorRow(line: string): ('left' | 'center' | 'right')[] {
  const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
  
  return cells.map(cell => {
    if (cell.startsWith(':') && cell.endsWith(':')) {
      return 'center';
    } else if (cell.endsWith(':')) {
      return 'right';
    } else {
      return 'left';
    }
  });
}

/**
 * Parse cells from a table row
 */
function parseTableCells(line: string): string[] {
  const cells = line.split('|').map(cell => cell.trim());
  
  if (cells[0] === '') cells.shift();
  if (cells.length > 0 && cells[cells.length - 1] === '') cells.pop();
  
  return cells;
}

/**
 * Render a parsed table to HTML with Tailwind classes
 */
function renderTable(table: ParsedTable): string {
  if (table.rows.length === 0) return '';

  let html = '<div class="table-container mb-6 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">';
  html += '<table class="min-w-full bg-white dark:bg-slate-800">';
  
  const hasHeaderRow = table.hasHeader || (table.rows.length > 0 && table.rows[0].cells.some(cell => cell.isHeader));
  
  if (hasHeaderRow) {
    html += '<thead class="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">';
    html += renderTableRow(table.rows[0], true);
    html += '</thead>';
    
    if (table.rows.length > 1) {
      html += '<tbody class="divide-y divide-slate-200 dark:divide-slate-700">';
      for (let i = 1; i < table.rows.length; i++) {
        html += renderTableRow(table.rows[i], false);
      }
      html += '</tbody>';
    }
  } else {
    html += '<tbody class="divide-y divide-slate-200 dark:divide-slate-700">';
    table.rows.forEach(row => {
      html += renderTableRow(row, false);
    });
    html += '</tbody>';
  }

  html += '</table>';
  html += '</div>';

  return html;
}

/**
 * Render a single table row with Tailwind classes
 */
function renderTableRow(row: TableRow, isHeader: boolean): string {
  const tag = isHeader ? 'th' : 'td';
  const baseClasses = isHeader 
    ? 'px-3 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider'
    : 'px-3 sm:px-6 py-4 text-sm text-slate-900 dark:text-slate-100';

  let html = isHeader 
    ? '<tr>' 
    : '<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">';

  row.cells.forEach(cell => {
    const alignment = getAlignmentClass(cell.alignment || 'left');
    const cellContent = processInlineFormatting(cell.content);
    
    html += `<${tag} class="${baseClasses} ${alignment}">${cellContent}</${tag}>`;
  });

  html += '</tr>';
  return html;
}

/**
 * Get CSS class for text alignment
 */
function getAlignmentClass(alignment: 'left' | 'center' | 'right'): string {
  switch (alignment) {
    case 'center': return 'text-center';
    case 'right': return 'text-right';
    default: return 'text-left';
  }
}

/**
 * Process a regular line with Tailwind classes
 */
function processRegularLine(line: string): string {
  const trimmed = line.trim();
  
  if (!trimmed || trimmedLineStartsWithListItem(line)) { 
    return '';
  }

  // Headers with Tailwind classes
  if (trimmed.startsWith('#### ')) {
    return `<h4 class="text-lg font-semibold mb-4 mt-8 text-slate-900 dark:text-slate-100">${processInlineFormatting(trimmed.substring(5))}</h4>`;
  }
  if (trimmed.startsWith('### ')) {
    return `<h3 class="text-xl font-semibold mb-4 mt-8 text-slate-900 dark:text-slate-100">${processInlineFormatting(trimmed.substring(4))}</h3>`;
  }
  if (trimmed.startsWith('## ')) {
    return `<h2 class="text-2xl font-bold mb-6 mt-10 text-slate-900 dark:text-slate-100">${processInlineFormatting(trimmed.substring(3))}</h2>`;
  }
  if (trimmed.startsWith('# ')) {
    return `<h1 class="text-3xl font-bold mb-8 mt-12 text-slate-900 dark:text-slate-100">${processInlineFormatting(trimmed.substring(2))}</h1>`;
  }

  // Blockquotes with Tailwind classes
  if (trimmed.startsWith('> ')) {
    return `<blockquote class="border-l-4 border-blue-500 dark:border-blue-400 pl-6 py-4 mb-6 bg-blue-50 dark:bg-blue-900/20 text-slate-700 dark:text-slate-300 italic rounded-r-lg">${processInlineFormatting(trimmed.substring(2))}</blockquote>`;
  }

  // Regular paragraphs with Tailwind classes
  return `<p class="mb-4 text-slate-700 dark:text-slate-300 leading-relaxed">${processInlineFormatting(trimmed)}</p>`;
}

/**
 * Process inline formatting with Tailwind classes
 */
function processInlineFormatting(text: string): string {
  let result = escapeHtml(text);
  
  // Links with Tailwind classes
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline transition-colors font-medium" target="_blank" rel="noopener noreferrer">$1</a>');
  
  // Bold with Tailwind classes
  result = result.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-slate-900 dark:text-slate-100">$1</strong>');
  
  // Italic with Tailwind classes
  result = result.replace(/\*([^*]+)\*/g, '<em class="italic text-slate-800 dark:text-slate-200">$1</em>');
  
  // Inline code with Tailwind classes
  result = result.replace(/`([^`]+)`/g, '<code class="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-2 py-1 rounded text-sm font-mono border border-slate-200 dark:border-slate-600">$1</code>');
  
  return result;
}

/**
 * Create a code block with CSS-based syntax highlighting (not Tailwind dependent)
 */
function createCodeBlock(code: string, language: string): string {
  const highlightedCode = language ? addSyntaxHighlighting(code, language) : escapeHtml(code);
  
  let html = '<div class="code-container mb-8 rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700">';
  
  if (language) {
    html += `<div class="code-header bg-slate-800 dark:bg-slate-900 text-slate-200 dark:text-slate-300 px-4 py-3 text-sm font-semibold border-b border-slate-700 dark:border-slate-600">${language.toUpperCase()}</div>`;
  }
  
  // Code block with CSS-based styling
  html += `<div class="code-block" style="background-color: #0f172a; color: #f1f5f9; padding: 1.5rem; overflow-x: auto; font-family: 'JetBrains Mono', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace; font-size: 14px; line-height: 1.6;">`;
  html += `<pre style="margin: 0; white-space: pre-wrap; word-wrap: break-word;"><code class="language-${language}">${highlightedCode}</code></pre>`;
  html += '</div>';
  html += '</div>';
  
  return html;
}

/**
 * Add syntax highlighting based on language using CSS styles
 */
function addSyntaxHighlighting(code: string, language: string): string {
  const lang = language.toLowerCase();
  
  switch (lang) {
    case 'java':
      return highlightJava(code);
    case 'sql':
      return highlightSQL(code);
    case 'javascript':
    case 'js':
    case 'typescript':
    case 'ts':
      return highlightJavaScript(code);
    case 'go':
    case 'golang':
      return highlightGo(code);
    case 'json':
      return highlightJSON(code);
    case 'bash':
    case 'shell':
    case 'sh':
      return highlightBash(code);
    case 'python':
    case 'py':
      return highlightPython(code);
    case 'css':
      return highlightCSS(code);
    case 'html':
    case 'xml':
      return highlightHTML(code);
    case 'csharp':
    case 'c#':
      return highlightCSharp(code);
    default:
      return escapeHtml(code);
  }
}

/**
 * Enhanced syntax highlighting for Java using CSS styles
 */
function highlightJava(code: string): string {
  let result = escapeHtml(code);

  // Keywords
  const keywords = ['public', 'private', 'protected', 'static', 'final', 'class', 'interface', 'extends', 'implements', 'import', 'package', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'return', 'try', 'catch', 'finally', 'throw', 'throws', 'new', 'this', 'super', 'abstract', 'synchronized', 'volatile', 'transient', 'native', 'strictfp'];
  const keywordPattern = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
  result = result.replace(keywordPattern, '<span style="color: #c084fc; font-weight: 600;">$1</span>');
  
  // Annotations
  result = result.replace(/(@\w+)/g, '<span style="color: #fbbf24; font-weight: 600;">$1</span>');
  
  // Types
  const types = ['int', 'long', 'short', 'byte', 'double', 'float', 'boolean', 'char', 'String', 'void', 'Object', 'List', 'Long', 'LocalDateTime', 'ResponseEntity', 'HttpStatus', 'Entity', 'Table', 'Column', 'Id', 'GeneratedValue', 'GenerationType', 'IDENTITY', 'CreationTimestamp', 'UpdateTimestamp'];
  const typePattern = new RegExp(`\\b(${types.join('|')})\\b`, 'g');
  result = result.replace(typePattern, '<span style="color: #60a5fa; font-weight: 500;">$1</span>');
  
  // Strings
  result = result.replace(/&quot;([^&]*)&quot;/g, '<span style="color: #4ade80;">&quot;$1&quot;</span>');
  
  // Numbers
  result = result.replace(/\b(\d+\.?\d*[fFdDlL]?)\b/g, '<span style="color: #fb923c;">$1</span>');
  
  // Comments
  result = result.replace(/\/\/(.*)$/gm, '<span style="color: #9ca3af; font-style: italic;">//$1</span>');
  result = result.replace(/\/\*([\s\S]*?)\*\//g, '<span style="color: #9ca3af; font-style: italic;">/*$1*/</span>');
  
  return result;
}

/**
 * Syntax highlighting for C# using CSS styles
 */
function highlightCSharp(code: string): string {
  let result = escapeHtml(code);

  // Keywords
  const keywords = ['public', 'private', 'protected', 'internal', 'static', 'readonly', 'const', 'class', 'interface', 'struct', 'enum', 'namespace', 'using', 'if', 'else', 'for', 'foreach', 'while', 'do', 'switch', 'case', 'break', 'continue', 'return', 'try', 'catch', 'finally', 'throw', 'new', 'this', 'base', 'abstract', 'virtual', 'override', 'sealed', 'async', 'await', 'var'];
  const keywordPattern = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
  result = result.replace(keywordPattern, '<span style="color: #c084fc; font-weight: 600;">$1</span>');
  
  // Types
  const types = ['int', 'long', 'short', 'byte', 'double', 'float', 'bool', 'char', 'string', 'void', 'object', 'DateTime', 'List', 'Dictionary', 'Array', 'IEnumerable', 'Task'];
  const typePattern = new RegExp(`\\b(${types.join('|')})\\b`, 'g');
  result = result.replace(typePattern, '<span style="color: #60a5fa; font-weight: 500;">$1</span>');
  
  // Strings
  result = result.replace(/&quot;([^&]*)&quot;/g, '<span style="color: #4ade80;">&quot;$1&quot;</span>');
  
  // Numbers
  result = result.replace(/\b(\d+\.?\d*[fFdDlLmM]?)\b/g, '<span style="color: #fb923c;">$1</span>');
  
  // Comments
  result = result.replace(/\/\/(.*)$/gm, '<span style="color: #9ca3af; font-style: italic;">//$1</span>');
  result = result.replace(/\/\*([\s\S]*?)\*\//g, '<span style="color: #9ca3af; font-style: italic;">/*$1*/</span>');
  
  return result;
}

/**
 * Syntax highlighting for SQL using CSS styles
 */
function highlightSQL(code: string): string {
  let result = escapeHtml(code);
  
  const keywords = ['CREATE', 'TABLE', 'SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE', 'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'CONSTRAINT', 'INDEX', 'DATABASE', 'ALTER', 'DROP', 'VARCHAR', 'CHAR', 'TEXT', 'INT', 'INTEGER', 'BIGINT', 'SMALLINT', 'DECIMAL', 'FLOAT', 'DOUBLE', 'BOOLEAN', 'DATE', 'DATETIME', 'TIMESTAMP', 'TIME', 'DEFAULT', 'NOT', 'NULL', 'UNIQUE', 'AUTO_INCREMENT', 'ON', 'UPDATE', 'CURRENT_TIMESTAMP'];
  const keywordPattern = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi');
  result = result.replace(keywordPattern, '<span style="color: #c084fc; font-weight: 600;">$1</span>');
  
  // Strings
  result = result.replace(/'([^']*)'/g, '<span style="color: #4ade80;">\'$1\'</span>');
  
  // Numbers
  result = result.replace(/\b(\d+)\b/g, '<span style="color: #fb923c;">$1</span>');
  
  // Comments
  result = result.replace(/--(.*)$/gm, '<span style="color: #9ca3af; font-style: italic;">--$1</span>');
  
  return result;
}

/**
 * Syntax highlighting for JavaScript/TypeScript using CSS styles
 */
function highlightJavaScript(code: string): string {
  let result = escapeHtml(code);
  
  const keywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'try', 'catch', 'finally', 'throw', 'async', 'await', 'class', 'extends', 'import', 'export', 'from', 'default', 'new', 'this', 'super', 'typeof', 'instanceof'];
  const keywordPattern = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
  result = result.replace(keywordPattern, '<span style="color: #c084fc; font-weight: 600;">$1</span>');
  
  // Built-ins
  result = result.replace(/\b(console|document|window|Array|Object|String|Number|Boolean|Date|Math|JSON|Promise|Error)\b/g, '<span style="color: #22d3ee; font-weight: 500;">$1</span>');
  
  // Strings (double quotes)
  result = result.replace(/&quot;([^&]*)&quot;/g, '<span style="color: #4ade80;">&quot;$1&quot;</span>');
  
  // Strings (single quotes)
  result = result.replace(/&#x27;([^&]*)&#x27;/g, '<span style="color: #4ade80;">&#x27;$1&#x27;</span>');
  
  // Template literals
  result = result.replace(/`([^`]*)`/g, '<span style="color: #4ade80;">`$1`</span>');
  
  // Numbers
  result = result.replace(/\b(\d+\.?\d*)\b/g, '<span style="color: #fb923c;">$1</span>');
  
  // Comments
  result = result.replace(/\/\/(.*)$/gm, '<span style="color: #9ca3af; font-style: italic;">//$1</span>');
  result = result.replace(/\/\*([\s\S]*?)\*\//g, '<span style="color: #9ca3af; font-style: italic;">/*$1*/</span>');
  
  return result;
}

/**
 * Syntax highlighting for Go using CSS styles
 */
function highlightGo(code: string): string {
  let result = escapeHtml(code);
  
  const keywords = ['package', 'import', 'func', 'var', 'const', 'type', 'struct', 'interface', 'if', 'else', 'for', 'range', 'switch', 'case', 'default', 'break', 'continue', 'return', 'go', 'chan', 'select', 'defer', 'panic', 'recover', 'map', 'slice', 'make', 'append', 'len', 'cap', 'copy', 'delete', 'new'];
  const keywordPattern = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
  result = result.replace(keywordPattern, '<span style="color: #c084fc; font-weight: 600;">$1</span>');
  
  const types = ['int', 'int8', 'int16', 'int32', 'int64', 'uint', 'uint8', 'uint16', 'uint32', 'uint64', 'float32', 'float64', 'bool', 'string', 'byte', 'rune', 'error'];
  const typePattern = new RegExp(`\\b(${types.join('|')})\\b`, 'g');
  result = result.replace(typePattern, '<span style="color: #60a5fa; font-weight: 500;">$1</span>');
  
  // Strings
  result = result.replace(/&quot;([^&]*)&quot;/g, '<span style="color: #4ade80;">&quot;$1&quot;</span>');
  result = result.replace(/`([^`]*)`/g, '<span style="color: #4ade80;">`$1`</span>');
  
  // Numbers
  result = result.replace(/\b(\d+\.?\d*)\b/g, '<span style="color: #fb923c;">$1</span>');
  
  // Comments
  result = result.replace(/\/\/(.*)$/gm, '<span style="color: #9ca3af; font-style: italic;">//$1</span>');
  result = result.replace(/\/\*([\s\S]*?)\*\//g, '<span style="color: #9ca3af; font-style: italic;">/*$1*/</span>');
  
  return result;
}

/**
 * Syntax highlighting for JSON using CSS styles
 */
function highlightJSON(code: string): string {
  let result = escapeHtml(code);
  
  // Keys
  result = result.replace(/&quot;([^&]+)&quot;(\s*:)/g, '<span style="color: #60a5fa; font-weight: 500;">&quot;$1&quot;</span>$2');
  
  // String values
  result = result.replace(/:\s*&quot;([^&]*)&quot;/g, ': <span style="color: #4ade80;">&quot;$1&quot;</span>');
  
  // Numbers
  result = result.replace(/:\s*(\d+\.?\d*)/g, ': <span style="color: #fb923c;">$1</span>');
  
  // Booleans and null
  result = result.replace(/:\s*(true|false|null)\b/g, ': <span style="color: #c084fc; font-weight: 600;">$1</span>');
  
  return result;
}

/**
 * Syntax highlighting for Bash/Shell using CSS styles
 */
function highlightBash(code: string): string {
  let result = escapeHtml(code);
  
  // Commands at start of line
  result = result.replace(/^(\$\s*)(\w+)/gm, '$1<span style="color: #60a5fa; font-weight: 600;">$2</span>');
  
  // Flags
  result = result.replace(/(\s)(--?\w+)/g, '$1<span style="color: #22d3ee;">$2</span>');
  
  // Strings
  result = result.replace(/&quot;([^&]*)&quot;/g, '<span style="color: #4ade80;">&quot;$1&quot;</span>');
  result = result.replace(/&#x27;([^&]*)&#x27;/g, '<span style="color: #4ade80;">&#x27;$1&#x27;</span>');
  
  // Comments
  result = result.replace(/#(.*)$/gm, '<span style="color: #9ca3af; font-style: italic;">#$1</span>');
  
  return result;
}

/**
 * Syntax highlighting for Python using CSS styles
 */
function highlightPython(code: string): string {
  let result = escapeHtml(code);
  
  const keywords = ['def', 'class', 'if', 'elif', 'else', 'for', 'while', 'try', 'except', 'finally', 'import', 'from', 'as', 'return', 'yield', 'break', 'continue', 'pass', 'with', 'lambda', 'global', 'nonlocal', 'and', 'or', 'not', 'in', 'is'];
  const keywordPattern = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
  result = result.replace(keywordPattern, '<span style="color: #c084fc; font-weight: 600;">$1</span>');
  
  // Built-ins
  result = result.replace(/\b(print|len|range|str|int|float|list|dict|tuple|set|bool|None|True|False)\b/g, '<span style="color: #22d3ee; font-weight: 500;">$1</span>');
  
  // Strings (single quotes)
  result = result.replace(/&#x27;([^&]*)&#x27;/g, '<span style="color: #4ade80;">&#x27;$1&#x27;</span>');
  
  // Strings (double quotes)
  result = result.replace(/&quot;([^&]*)&quot;/g, '<span style="color: #4ade80;">&quot;$1&quot;</span>');
  
  // Numbers
  result = result.replace(/\b(\d+\.?\d*)\b/g, '<span style="color: #fb923c;">$1</span>');
  
  // Comments
  result = result.replace(/#(.*)$/gm, '<span style="color: #9ca3af; font-style: italic;">#$1</span>');
  
  return result;
}

/**
 * Syntax highlighting for CSS using CSS styles
 */
function highlightCSS(code: string): string {
  let result = escapeHtml(code);
  
  // Properties
  result = result.replace(/(\w+)(\s*:)/g, '<span style="color: #60a5fa; font-weight: 500;">$1</span>$2');
  
  // Values
  result = result.replace(/:\s*([^;]+);/g, ': <span style="color: #4ade80;">$1</span>;');
  
  // Selectors
  result = result.replace(/^([^{]+){/gm, '<span style="color: #c084fc; font-weight: 600;">$1</span>{');
  
  // Comments
  result = result.replace(/\/\*([\s\S]*?)\*\//g, '<span style="color: #9ca3af; font-style: italic;">/*$1*/</span>');
  
  return result;
}

/**
 * Syntax highlighting for HTML using CSS styles
 */
function highlightHTML(code: string): string {
  let result = escapeHtml(code);
  
  // Tags
  result = result.replace(/&lt;(\/?[\w-]+)/g, '&lt;<span style="color: #ef4444; font-weight: 600;">$1</span>');
  result = result.replace(/&gt;/g, '<span style="color: #ef4444; font-weight: 600;">&gt;</span>');
  
  // Attributes
  result = result.replace(/(\w+)=(&quot;[^&]*&quot;)/g, '<span style="color: #60a5fa;">$1</span>=<span style="color: #4ade80;">$2</span>');
  
  // Comments
  result = result.replace(/&lt;!--([\s\S]*?)--&gt;/g, '<span style="color: #9ca3af; font-style: italic;">&lt;!--$1--&gt;</span>');
  
  return result;
}

/**
 * Escape HTML characters
 */
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  return text.replace(/[&<>"'`]/g, (match) => map[match]);
}

/**
 * Calculate reading time based on word count
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
