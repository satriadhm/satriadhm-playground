---
title: A Way to Define a Service Architecture
excerpt: In defining an architecture, the best way we can do is to follow one or more Design Principle rules and principles.
date: 2025-06-01
category: Backend Development
featured: false
author: Developer Guide
tags: [Java, Design Principle, Backend, Clean Architecture]
image: /images/blog/java-folder-architecture.jpg
---

**Disclaimer**: In this article, the terms project, class, interface, and model refer to Object-Oriented Programming (OOP) concepts and implementations in Java.

There are many ways to define a service architecture, especially a folder architecture. But of course, we don't want to trouble many people and ourselves, right? I will share one (of many) ways to make your service more maintainable.

## Database First

In Java projects, we can separate the database from the business logic we want to create. This is aligned with the Separation of Concerns principle so it can be more maintainable in the future. I tend to choose to put Models and Database Definitions in a separate project rather than combining them with the project that contains controllers and/or business logic.

### Defining Models and Code-First Database Migration

When following a database-first approach, we start by defining our data models that represent the structure of our database tables. In Java, these are typically implemented as Entity classes using JPA annotations:

```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String firstName;
    
    @Column(nullable = false)
    private String lastName;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    
    // Constructors, getters, and setters
}
```

For code-first database migration, we use tools like Flyway or Liquibase to manage database schema changes:

```sql
-- V1__Create_users_table.sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

This approach ensures that database changes are versioned, tracked, and can be applied consistently across different environments.

## Business Class

Then this database will be used in Business Classes that will process and manipulate this data through DTOs and implement the functionality and requirements requested. It is in this project that the core business logic resides.

### Using DTOs

DTO (Data Transfer Object) is used as a blueprint of the data contained in the database so that any changes do not directly involve the database project. DTOs serve several important purposes:

1. **Decoupling**: They separate the internal data representation from external APIs
2. **Data Transformation**: They allow you to shape data according to specific use cases
3. **Security**: They prevent exposing sensitive internal data structures
4. **Validation**: They can include validation rules specific to each use case

```java
// Input DTO for creating a user
public class CreateUserDTO {
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;
    
    @NotBlank(message = "First name is required")
    @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
    private String firstName;
    
    @NotBlank(message = "Last name is required")
    @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
    private String lastName;
    
    // Constructors, getters, and setters
}

// Output DTO for returning user information
public class UserResponseDTO {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private LocalDateTime createdAt;
    
    // Constructors, getters, and setters
}
```

### Interface as Gateway

To implement the Dependency Inversion Principle (one of the SOLID principles), Business Classes will implement interfaces so that controllers will call these interfaces instead of Business Classes directly. This approach provides several benefits:

1. **Loose Coupling**: Controllers depend on abstractions, not concrete implementations
2. **Testability**: Easy to mock dependencies for unit testing
3. **Flexibility**: Easy to swap implementations without changing client code
4. **Maintainability**: Changes to implementation don't affect the interface contract

```java
// Service Interface
public interface UserService {
    UserResponseDTO createUser(CreateUserDTO createUserDTO);
    UserResponseDTO getUserById(Long id);
    List<UserResponseDTO> getAllUsers();
    UserResponseDTO updateUser(Long id, UpdateUserDTO updateUserDTO);
    void deleteUser(Long id);
}

// Service Implementation
@Service
@Transactional
public class UserServiceImpl implements UserService {
    
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    
    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }
    
    @Override
    public UserResponseDTO createUser(CreateUserDTO createUserDTO) {
        User user = userMapper.toEntity(createUserDTO);
        User savedUser = userRepository.save(user);
        return userMapper.toResponseDTO(savedUser);
    }
    
    @Override
    public UserResponseDTO getUserById(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
        return userMapper.toResponseDTO(user);
    }
    
    // Other method implementations...
}
```

## Controller for Defining Endpoints

Controllers are responsible for handling HTTP requests and responses. They serve as the entry point for external clients and coordinate between the web layer and the business layer. Controllers should be thin and delegate business logic to service classes.

Key responsibilities of controllers include:
- **Request Handling**: Processing incoming HTTP requests
- **Input Validation**: Validating request parameters and body
- **Response Formatting**: Formatting responses according to API specifications
- **Error Handling**: Managing exceptions and returning appropriate error responses
- **Security**: Implementing authentication and authorization checks

```java
@RestController
@RequestMapping("/api/v1/users")
@Validated
public class UserController {
    
    private final UserService userService;
    
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(@Valid @RequestBody CreateUserDTO createUserDTO) {
        UserResponseDTO user = userService.createUser(createUserDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id) {
        UserResponseDTO user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }
    
    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        List<UserResponseDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDTO> updateUser(
            @PathVariable Long id, 
            @Valid @RequestBody UpdateUserDTO updateUserDTO) {
        UserResponseDTO user = userService.updateUser(id, updateUserDTO);
        return ResponseEntity.ok(user);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
```

## Complete Example

Here's how the complete project structure would look:

```
my-service/
├── database-module/
│   ├── src/main/java/
│   │   └── com/example/database/
│   │       ├── entity/
│   │       │   └── User.java
│   │       └── repository/
│   │           └── UserRepository.java
│   └── src/main/resources/
│       └── db/migration/
│           └── V1__Create_users_table.sql
├── business-module/
│   └── src/main/java/
│       └── com/example/business/
│           ├── dto/
│           │   ├── CreateUserDTO.java
│           │   ├── UpdateUserDTO.java
│           │   └── UserResponseDTO.java
│           ├── service/
│           │   ├── UserService.java
│           │   └── UserServiceImpl.java
│           ├── mapper/
│           │   └── UserMapper.java
│           └── exception/
│               └── UserNotFoundException.java
└── web-module/
    └── src/main/java/
        └── com/example/web/
            ├── controller/
            │   └── UserController.java
            ├── config/
            │   └── WebConfig.java
            └── exception/
                └── GlobalExceptionHandler.java
```

### Mapper Implementation

```java
@Mapper(componentModel = "spring")
public interface UserMapper {
    
    User toEntity(CreateUserDTO createUserDTO);
    
    UserResponseDTO toResponseDTO(User user);
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateEntityFromDTO(UpdateUserDTO updateUserDTO, @MappingTarget User user);
}
```

### Global Exception Handler

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFoundException(UserNotFoundException ex) {
        ErrorResponse error = new ErrorResponse("USER_NOT_FOUND", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getFieldErrors()
            .stream()
            .map(FieldError::getDefaultMessage)
            .collect(Collectors.joining(", "));
        ErrorResponse error = new ErrorResponse("VALIDATION_ERROR", message);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
}
```

## Conclusion

This architectural approach provides several key benefits:

1. **Separation of Concerns**: Each layer has a distinct responsibility, making the codebase easier to understand and maintain.

2. **Testability**: The use of interfaces and dependency injection makes it easy to write unit tests by mocking dependencies.

3. **Scalability**: The modular structure allows teams to work on different parts of the application independently.

4. **Flexibility**: The loose coupling between layers makes it easier to change implementations without affecting other parts of the system.

5. **Maintainability**: Clear boundaries between layers and consistent patterns make the codebase easier to maintain and extend.

By following these principles and patterns, you can create a robust, maintainable backend service that can evolve with your business requirements while maintaining code quality and developer productivity. Remember that architecture is not one-size-fits-all, and you should adapt these patterns to fit your specific use case and team preferences.