// src/utils/blog.ts - Fixed version with working highlighting and formatting
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
// src/utils/blog.ts - Fixed version with working highlighting
export function parseMarkdown(markdown: string): string {
  if (!markdown || typeof markdown !== 'string') {
    return '<p class="mb-4 text-slate-700 dark:text-slate-300">No content available</p>';
  }

  try {
    return processContent(markdown);
  } catch (error) {
    console.error('Markdown parsing error:', error);
    return `<p class="mb-4 text-slate-700 dark:text-slate-300">${escapeHtml(markdown)}</p>`;
  }
}

function processContent(text: string): string {
  const lines = text.split('\n');
  const result: string[] = [];
  let inCodeBlock = false;
  let codeLanguage = '';
  let codeContent: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Handle code blocks
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        // End code block
        result.push(createCodeBlock(codeContent.join('\n'), codeLanguage));
        inCodeBlock = false;
        codeLanguage = '';
        codeContent = [];
      } else {
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

    // Process non-code lines
    const processedLine = processLine(line);
    if (processedLine) {
      result.push(processedLine);
    }
  }

  return result.join('\n');
}

function processLine(line: string): string {
  const trimmed = line.trim();
  
  if (!trimmed) {
    return '';
  }

  // Headers
  if (trimmed.startsWith('### ')) {
    return `<h3 class="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100">${escapeHtml(trimmed.substring(4))}</h3>`;
  }
  if (trimmed.startsWith('## ')) {
    return `<h2 class="text-xl font-bold mb-4 text-slate-900 dark:text-slate-100">${escapeHtml(trimmed.substring(3))}</h2>`;
  }
  if (trimmed.startsWith('# ')) {
    return `<h1 class="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-100">${escapeHtml(trimmed.substring(2))}</h1>`;
  }

  // Lists
  if (trimmed.startsWith('- ')) {
    return `<li class="mb-1 text-slate-700 dark:text-slate-300">${processInlineFormatting(trimmed.substring(2))}</li>`;
  }

  // Regular paragraphs
  return `<p class="mb-3 text-slate-700 dark:text-slate-300 leading-relaxed">${processInlineFormatting(trimmed)}</p>`;
}

function processInlineFormatting(text: string): string {
  let result = escapeHtml(text);
  
  // Process bold
  result = result.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-slate-900 dark:text-slate-100">$1</strong>');
  
  // Process italic
  result = result.replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>');
  
  // Process inline code
  result = result.replace(/`([^`]+)`/g, '<code class="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-1 py-0.5 rounded text-xs font-mono">$1</code>');
  
  return result;
}

function createCodeBlock(code: string, language: string): string {
  const highlightedCode = language ? addSyntaxHighlighting(code, language) : escapeHtml(code);
  
  let html = '<div class="code-container mb-4">';
  
  if (language) {
    html += `<div class="code-header">${language.toUpperCase()}</div>`;
  }
  
  html += `<div class="code-block"><pre><code>${highlightedCode}</code></pre></div>`;
  html += '</div>';
  
  return html;
}

function addSyntaxHighlighting(code: string, language: string): string {
  const lang = language.toLowerCase();
  
  if (lang === 'java') {
    return highlightJava(code);
  }
  
  if (lang === 'sql') {
    return highlightSQL(code);
  }
  
  if (lang === 'javascript' || lang === 'js' || lang === 'typescript' || lang === 'ts') {
    return highlightJavaScript(code);
  }

  if (lang === 'go' || lang === 'golang') {
    return highlightGo(code);
  }

  if (lang === 'json') {
    return highlightJSON(code);
  }

  if (lang === 'bash' || lang === 'shell' || lang === 'sh') {
    return highlightBash(code);
  }
  
  return escapeHtml(code);
}

function highlightJava(code: string): string {
  // Assuming 'code' a_rgument is already HTML-escaped from a prior step (e.g., by escapeHtml(rawCode)).
  let result = code;

  // Keywords - These regexes should generally work on escaped text as keywords don't contain HTML special chars.
  result = result.replace(/\b(public|private|protected|static|final|class|interface|extends|implements|import|package|if|else|for|while|do|switch|case|break|continue|return|try|catch|finally|throw|throws|new|this|super|abstract|synchronized|volatile|transient|native|strictfp)\b/g, '<span class="hl-keyword">$1</span>');
  
  // Annotations
  result = result.replace(/\b(@Override|@Entity|@Table|@Id|@GeneratedValue|@Column|@CreationTimestamp|@UpdateTimestamp|@Service|@Transactional|@RestController|@RequestMapping|@PostMapping|@GetMapping|@PutMapping|@DeleteMapping|@PathVariable|@RequestBody|@Valid|@NotBlank|@Email|@Size|@Mapper)\b/g, '<span class="hl-annotation">$1</span>');
  
  // Types
  result = result.replace(/\b(int|long|short|byte|double|float|boolean|char|String|void|Object|List|Long|LocalDateTime|ResponseEntity|HttpStatus|GenerationType)\b/g, '<span class="hl-type">$1</span>');
  
  // Strings - MODIFIED to work with &quot;
  // This regex matches content between &quot; entities.
  result = result.replace(/&quot;((?:(?!&quot;).)*)&quot;/g, '<span class="hl-string">&quot;$1&quot;</span>');
  
  // Numbers
  result = result.replace(/\b(\d+\.?\d*[fFdDlL]?)\b/g, '<span class="hl-number">$1</span>');
  
  // Comments - Standard // and /* */ comments. Assumes / and * are not escaped by escapeHtml in a way that breaks this.
  // escapeHtml typically doesn't escape / or *.
  result = result.replace(/\/\/(.*)$/gm, '<span class="hl-comment">//$1</span>');
  result = result.replace(/\/\*([\s\S]*?)\*\//g, '<span class="hl-comment">/*$1*/</span>');
  
  return result;
}

function highlightSQL(code: string): string {
  let result = escapeHtml(code);
  
  // SQL Keywords
  result = result.replace(/\b(CREATE|TABLE|SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|PRIMARY|KEY|FOREIGN|REFERENCES|CONSTRAINT|INDEX|DATABASE|ALTER|DROP|VARCHAR|CHAR|TEXT|INT|INTEGER|BIGINT|SMALLINT|DECIMAL|FLOAT|DOUBLE|BOOLEAN|DATE|DATETIME|TIMESTAMP|TIME|DEFAULT|NOT|NULL|UNIQUE|AUTO_INCREMENT|ON|UPDATE|CURRENT_TIMESTAMP)\b/gi, '<span class="hl-keyword">$&</span>');
  
  // Strings
  result = result.replace(/'([^']*)'/g, '<span class="hl-string">\'$1\'</span>');
  
  // Numbers
  result = result.replace(/\b(\d+)\b/g, '<span class="hl-number">$1</span>');
  
  // Comments
  result = result.replace(/--(.*)$/gm, '<span class="hl-comment">--$1</span>');
  
  return result;
}

function highlightJavaScript(code: string): string {
  let result = escapeHtml(code);
  
  // Keywords
  result = result.replace(/\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|async|await|class|extends|import|export|from|default|new|this|super|typeof|instanceof)\b/g, '<span class="hl-keyword">$1</span>');
  
  // Strings
  result = result.replace(/"([^"]*)"/g, '<span class="hl-string">"$1"</span>');
  result = result.replace(/'([^']*)'/g, '<span class="hl-string">\'$1\'</span>');
  result = result.replace(/`([^`]*)`/g, '<span class="hl-string">`$1`</span>');
  
  // Numbers
  result = result.replace(/\b(\d+\.?\d*)\b/g, '<span class="hl-number">$1</span>');
  
  // Comments
  result = result.replace(/\/\/(.*)$/gm, '<span class="hl-comment">//$1</span>');
  
  return result;
}

function highlightGo(code: string): string {
  let result = escapeHtml(code);
  
  // Keywords
  result = result.replace(/\b(package|import|func|var|const|type|struct|interface|if|else|for|range|switch|case|default|break|continue|return|go|chan|select|defer|panic|recover|map|slice|make|append|len|cap|copy|delete|new)\b/g, '<span class="hl-keyword">$1</span>');
  
  // Types
  result = result.replace(/\b(int|int8|int16|int32|int64|uint|uint8|uint16|uint32|uint64|float32|float64|bool|string|byte|rune|error)\b/g, '<span class="hl-type">$1</span>');
  
  // Strings
  result = result.replace(/"([^"]*)"/g, '<span class="hl-string">"$1"</span>');
  result = result.replace(/`([^`]*)`/g, '<span class="hl-string">`$1`</span>');
  
  // Numbers
  result = result.replace(/\b(\d+\.?\d*)\b/g, '<span class="hl-number">$1</span>');
  
  // Comments
  result = result.replace(/\/\/(.*)$/gm, '<span class="hl-comment">//$1</span>');
  
  return result;
}

function highlightJSON(code: string): string {
  let result = escapeHtml(code);
  
  // Keys
  result = result.replace(/"([^"]+)"(\s*:)/g, '<span class="hl-type">"$1"</span>$2');
  
  // String values
  result = result.replace(/:\s*"([^"]*)"/g, ': <span class="hl-string">"$1"</span>');
  
  // Numbers
  result = result.replace(/:\s*(\d+\.?\d*)/g, ': <span class="hl-number">$1</span>');
  
  // Booleans and null
  result = result.replace(/:\s*(true|false|null)\b/g, ': <span class="hl-keyword">$1</span>');
  
  return result;
}

function highlightBash(code: string): string {
  let result = escapeHtml(code);
  
  // Commands
  result = result.replace(/^(\$\s*)(\w+)/gm, '$1<span class="hl-keyword">$2</span>');
  
  // Flags
  result = result.replace(/(\s)(--?\w+)/g, '$1<span class="hl-type">$2</span>');
  
  // Strings
  result = result.replace(/"([^"]*)"/g, '<span class="hl-string">"$1"</span>');
  result = result.replace(/'([^']*)'/g, '<span class="hl-string">\'$1\'</span>');
  
  // Comments
  result = result.replace(/#(.*)$/gm, '<span class="hl-comment">#$1</span>');
  
  return result;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
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