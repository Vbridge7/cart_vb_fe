# Agent Blueprint: HTML to React Styling Migration System

## Overview
This document provides comprehensive prompts, tools, utilities, and architecture for building an autonomous agent that can replicate HTML styling into React/Next.js applications.

---

## Table of Contents
1. [System Architecture](#system-architecture)
2. [Agent Core Prompts](#agent-core-prompts)
3. [Required Tools & APIs](#required-tools--apis)
4. [Utility Functions](#utility-functions)
5. [Agent Workflow](#agent-workflow)
6. [Implementation Guide](#implementation-guide)
7. [Example Agent Code](#example-agent-code)
8. [Testing & Validation](#testing--validation)

---

## System Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                    STYLING MIGRATION AGENT                      │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │              CORE AGENT CONTROLLER                        │ │
│  │  - Main loop                                              │ │
│  │  - Task orchestration                                     │ │
│  │  - Decision making                                        │ │
│  └────────────────┬─────────────────────────────────────────┘ │
│                   │                                             │
│  ┌────────────────┴─────────────────────────────────────────┐ │
│  │                                                            │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │ │
│  │  │   ANALYZER   │  │   MAPPER     │  │  IMPLEMENTER │   │ │
│  │  │              │  │              │  │              │   │ │
│  │  │ - Parse HTML │  │ - Component  │  │ - Apply      │   │ │
│  │  │ - Extract    │  │   discovery  │  │   styling    │   │ │
│  │  │   patterns   │  │ - Map HTML   │  │ - Update     │   │ │
│  │  │ - Analyze    │  │   to React   │  │   configs    │   │ │
│  │  │   structure  │  │ - Build tree │  │ - Modify     │   │ │
│  │  │              │  │              │  │   files      │   │ │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘   │ │
│  │         │                  │                  │           │ │
│  └─────────┼──────────────────┼──────────────────┼───────────┘ │
│            │                  │                  │             │
│  ┌─────────┴──────────────────┴──────────────────┴───────────┐ │
│  │                    TOOL LAYER                              │ │
│  ├────────────────────────────────────────────────────────────┤ │
│  │  FileReader │ FileWriter │ FileSearch │ PatternMatcher    │ │
│  │  HTMLParser │ ASTParser  │ CSSExtractor│ TodoManager      │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                   UTILITY LAYER                            │ │
│  ├────────────────────────────────────────────────────────────┤ │
│  │  ColorConverter │ SpacingCalculator │ ComponentTreeBuilder│ │
│  │  StyleMapper    │ DependencyResolver│ ValidationChecker   │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                   KNOWLEDGE BASE                           │ │
│  ├────────────────────────────────────────────────────────────┤ │
│  │  - Tailwind class mappings                                 │ │
│  │  - React component patterns                                │ │
│  │  - CSS to Tailwind conversion rules                        │ │
│  │  - Common component structures                             │ │
│  └────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
```

---

## Agent Core Prompts

### System Prompt (Main Agent)

```markdown
You are a specialized AI agent for replicating HTML styling into React/Next.js applications. Your core competencies:

## Primary Objectives
1. Analyze HTML files to extract design patterns, colors, spacing, and typography
2. Discover all related React components that need updates
3. Map HTML structure to React component hierarchy
4. Apply extracted styling systematically while preserving functionality
5. Maintain code quality and best practices

## Core Capabilities
- HTML/CSS parsing and analysis
- React/TypeScript component understanding
- Tailwind CSS expertise
- File system navigation and modification
- Dependency tree building
- Pattern recognition and mapping

## Operational Guidelines
1. **Always analyze before implementing**: Read and understand before making changes
2. **Work systematically**: Follow a logical workflow (discover → analyze → map → implement)
3. **Preserve functionality**: Never modify business logic, only styling
4. **Track progress**: Use task management to ensure complete coverage
5. **Validate changes**: Verify each change maintains component functionality

## Tools at Your Disposal
- FileReader: Read and analyze files
- FileWriter: Modify files with exact replacements
- FileSearch: Find files by patterns
- HTMLParser: Extract structure and styles from HTML
- ComponentMapper: Build React component dependency trees
- TodoManager: Track tasks and progress

## Decision-Making Framework
When encountering a task:
1. Break it into phases: Analysis → Discovery → Mapping → Implementation → Verification
2. For each phase, identify required tools
3. Execute systematically, updating progress
4. Validate before moving to next phase

## Error Handling
- If a file doesn't exist, search for similar patterns
- If styling is ambiguous, extract the most specific pattern
- If components are nested deeply, build a complete tree before editing
- If functionality might break, preserve original logic

## Output Format
Provide clear, structured responses:
- Phase name
- Actions taken
- Tools used
- Results achieved
- Next steps

Begin each task by stating your understanding and planned approach.
```

### Analyzer Module Prompt

```markdown
You are the Analyzer module of a styling migration system.

## Your Role
Extract and analyze design patterns from HTML files.

## Input
- HTML file path
- Target React application structure

## Your Tasks
1. Parse HTML structure
2. Extract all inline styles
3. Identify design patterns:
   - Color palette
   - Typography system
   - Spacing values
   - Layout dimensions
   - Component sizes
4. Categorize CSS properties by purpose:
   - Layout (flexbox, grid, positioning)
   - Styling (colors, backgrounds, borders)
   - Typography (font-family, size, weight)
   - Spacing (padding, margin, gap)
   - Dimensions (width, height, max/min)

## Output Format
Return a structured JSON object:
```json
{
  "colors": {
    "primary": "#1A2332",
    "background": "#F8F6F2",
    "text": "#101010"
  },
  "spacing": {
    "large": "50px",
    "medium": "15px",
    "small": "10px"
  },
  "typography": {
    "fontFamily": "Onest",
    "baseFontSize": "14px",
    "baseFontWeight": "600"
  },
  "layout": {
    "sidebarWidth": "270px",
    "cardWidth": "270px",
    "gaps": ["15px", "10px", "6px"]
  },
  "components": [
    {
      "type": "sidebar",
      "styles": { ... }
    },
    {
      "type": "card",
      "styles": { ... }
    }
  ]
}
```

## Analysis Rules
1. Group similar colors (consider variations within 10% as same color)
2. Identify spacing patterns (commonly used values)
3. Extract font hierarchy
4. Recognize layout patterns (sidebar + main, grid, flex)
5. Identify reusable component styles

## Special Considerations
- Pay attention to responsive breakpoints
- Note hover states and transitions
- Identify conditional styling
- Extract z-index layers
```

### Mapper Module Prompt

```markdown
You are the Mapper module of a styling migration system.

## Your Role
Map HTML structure to React component hierarchy and create styling mappings.

## Input
- Analyzed HTML patterns (from Analyzer)
- React application root file path
- List of component files

## Your Tasks
1. Read the main React file (page.tsx, index.tsx)
2. Identify all imported components
3. Build component dependency tree
4. Map HTML sections to React components:
   - Match by semantic meaning
   - Match by structural similarity
   - Match by styling patterns
5. Create style mapping for each component:
   - HTML styles → Tailwind classes
   - Inline styles → Config values
   - Component-specific overrides

## Output Format
```json
{
  "componentTree": {
    "root": "page.tsx",
    "children": [
      {
        "name": "ProductSearchResult",
        "path": "components/search/ProductSearchResult.tsx",
        "children": [
          {
            "name": "FilterSummary",
            "path": "components/productSearch/FilterSummary.tsx"
          }
        ]
      }
    ]
  },
  "mappings": [
    {
      "component": "ProductSearchResult",
      "htmlSection": "filter-sidebar",
      "styleChanges": {
        "container": {
          "old": "w-1/5",
          "new": "w-[270px] bg-bg-cream p-[15px]"
        }
      }
    }
  ],
  "tailwindConfig": {
    "colorsToAdd": {
      "bg-cream": "#F8F6F2"
    },
    "spacingToAdd": {},
    "fontsToAdd": {
      "onest": ["Onest", "sans-serif"]
    }
  }
}
```

## Mapping Rules
1. Prioritize semantic matching (e.g., filter section → FilterSummary)
2. Use structural matching when semantics unclear
3. Preserve component hierarchy
4. Identify shared styles across components
5. Group related style changes

## Component Discovery Strategy
1. Start from root component
2. Read imports
3. Recursively discover child components
4. Build complete tree before mapping
5. Identify leaf components first, work up to root

## Edge Cases
- Components used multiple times (create reusable mapping)
- Conditional rendering (preserve logic, style all branches)
- Dynamic components (map base styles, preserve dynamic logic)
```

### Implementer Module Prompt

```markdown
You are the Implementer module of a styling migration system.

## Your Role
Apply style changes to React components based on mappings.

## Input
- Style mappings (from Mapper)
- Component file paths
- Tailwind config path

## Your Tasks
1. Update Tailwind configuration:
   - Add custom colors
   - Add custom spacing
   - Add custom fonts
   - Add custom utilities

2. Update each component file:
   - Read current file
   - Locate className attributes
   - Replace with new classes
   - Preserve all other code
   - Maintain indentation and formatting

3. Track progress:
   - Mark each component as pending/in-progress/completed
   - Report any errors or conflicts
   - Validate each change

## Implementation Order
1. Tailwind config (foundation)
2. Root layout component
3. Parent components
4. Child components (top-down)
5. Leaf components
6. Utility components

## Change Application Rules
1. **Always read before edit**
2. **Make exact string replacements**
3. **Preserve indentation**
4. **Keep functionality intact**:
   - Don't change props
   - Don't modify event handlers
   - Don't alter state management
   - Don't touch GraphQL queries
5. **Update only styling**:
   - className attributes
   - Style objects
   - CSS-in-JS

## Error Handling
- If string not found, search for similar patterns
- If multiple matches, choose most specific
- If edit fails, report and skip
- If conflict detected, preserve original and report

## Validation After Each Edit
- File still compiles (check syntax)
- Component structure intact
- No logic changed
- Styling properly applied

## Output Format
```json
{
  "filesUpdated": [
    {
      "path": "tailwind.config.js",
      "changes": ["Added bg-cream color", "Added onest font"],
      "status": "success"
    }
  ],
  "errors": [],
  "summary": {
    "totalFiles": 11,
    "successful": 11,
    "failed": 0
  }
}
```
```

---

## Required Tools & APIs

### Tool 1: FileReader

```typescript
interface FileReaderTool {
  name: "file_reader";
  description: "Read file contents from the filesystem";

  parameters: {
    file_path: string;      // Absolute path to file
    offset?: number;        // Start line (default: 0)
    limit?: number;         // Number of lines (default: 2000)
  };

  returns: {
    content: string;        // File content with line numbers
    totalLines: number;     // Total lines in file
    encoding: string;       // File encoding
  };

  usage: `
    // Read entire file
    await fileReader({ file_path: "/path/to/file.tsx" });

    // Read specific section
    await fileReader({
      file_path: "/path/to/file.tsx",
      offset: 50,
      limit: 100
    });
  `;
}
```

### Tool 2: FileWriter

```typescript
interface FileWriterTool {
  name: "file_writer";
  description: "Modify files with exact string replacement";

  parameters: {
    file_path: string;      // Absolute path to file
    old_string: string;     // Exact string to find
    new_string: string;     // Replacement string
    replace_all?: boolean;  // Replace all occurrences (default: false)
  };

  requirements: [
    "Must read file before editing",
    "old_string must be unique (unless replace_all=true)",
    "Must preserve exact indentation",
    "Must match whitespace exactly"
  ];

  returns: {
    success: boolean;
    linesChanged: number;
    error?: string;
  };

  usage: `
    // Replace single occurrence
    await fileWriter({
      file_path: "/path/to/file.tsx",
      old_string: "className=\"old-class\"",
      new_string: "className=\"new-class\""
    });

    // Replace all occurrences
    await fileWriter({
      file_path: "/path/to/file.tsx",
      old_string: "bg-white",
      new_string: "bg-cream",
      replace_all: true
    });
  `;
}
```

### Tool 3: FileSearch (Glob)

```typescript
interface FileSearchTool {
  name: "file_search";
  description: "Find files matching glob patterns";

  parameters: {
    pattern: string;        // Glob pattern (e.g., "**/*.tsx")
    path?: string;          // Search directory (default: cwd)
    exclude?: string[];     // Patterns to exclude
  };

  returns: {
    files: string[];        // Sorted array of matching paths
    count: number;          // Number of matches
  };

  patterns: {
    allTypeScriptReact: "**/*.tsx",
    allTypeScript: "**/*.ts",
    allComponents: "**/components/**/*.tsx",
    specificName: "**/*ComponentName*.tsx",
    excludeTests: "**/*.tsx, exclude: ['**/*.test.tsx']"
  };

  usage: `
    // Find all Accordion components
    await fileSearch({ pattern: "**/*Accordion*.tsx" });

    // Find all components excluding tests
    await fileSearch({
      pattern: "**/*.tsx",
      exclude: ["**/*.test.tsx", "**/*.spec.tsx"]
    });
  `;
}
```

### Tool 4: HTMLParser

```typescript
interface HTMLParserTool {
  name: "html_parser";
  description: "Parse HTML and extract structure and styles";

  parameters: {
    html: string;           // HTML content or file path
    extractStyles: boolean; // Extract inline styles (default: true)
    buildTree: boolean;     // Build DOM tree (default: true)
  };

  returns: {
    tree: DOMNode[];        // Parsed DOM tree
    styles: StyleMap;       // Extracted styles by selector
    colors: string[];       // All colors found
    spacing: string[];      // All spacing values found
    dimensions: string[];   // All dimensions found
    typography: TypographyInfo;
  };

  usage: `
    const parsed = await htmlParser({
      html: htmlContent,
      extractStyles: true,
      buildTree: true
    });

    // Access extracted data
    console.log(parsed.colors);      // ["#F8F6F2", "#1A2332", ...]
    console.log(parsed.spacing);     // ["15px", "10px", "50px", ...]
    console.log(parsed.typography);  // { fontFamily: "Onest", ... }
  `;
}
```

### Tool 5: ComponentTreeBuilder

```typescript
interface ComponentTreeBuilderTool {
  name: "component_tree_builder";
  description: "Build React component dependency tree";

  parameters: {
    rootFile: string;       // Root component file path
    maxDepth?: number;      // Max recursion depth (default: 10)
    includeNodeModules?: boolean; // Include external deps (default: false)
  };

  returns: {
    tree: ComponentNode;    // Component dependency tree
    flatList: ComponentInfo[]; // Flat list of all components
    imports: ImportMap;     // All imports mapped
  };

  types: `
    interface ComponentNode {
      name: string;
      path: string;
      imports: string[];
      children: ComponentNode[];
      depth: number;
    }

    interface ComponentInfo {
      name: string;
      path: string;
      type: 'component' | 'hook' | 'util';
      hasStyles: boolean;
    }
  `;

  usage: `
    const tree = await componentTreeBuilder({
      rootFile: "/app/page.tsx",
      maxDepth: 5
    });

    // Traverse tree
    function visitNode(node: ComponentNode) {
      console.log(node.name, node.path);
      node.children.forEach(visitNode);
    }
    visitNode(tree);
  `;
}
```

### Tool 6: TodoManager

```typescript
interface TodoManagerTool {
  name: "todo_manager";
  description: "Track task progress";

  parameters: {
    todos: Todo[];
  };

  types: `
    interface Todo {
      content: string;
      status: 'pending' | 'in_progress' | 'completed';
      activeForm: string;
    }
  `;

  returns: {
    success: boolean;
    currentTasks: Todo[];
  };

  usage: `
    // Create tasks
    await todoManager({
      todos: [
        {
          content: "Update Tailwind config",
          status: "pending",
          activeForm: "Updating Tailwind config"
        },
        {
          content: "Update ProductCard component",
          status: "in_progress",
          activeForm: "Updating ProductCard component"
        }
      ]
    });

    // Update progress
    await todoManager({
      todos: [
        {
          content: "Update Tailwind config",
          status: "completed",
          activeForm: "Updated Tailwind config"
        }
      ]
    });
  `;
}
```

---

## Utility Functions

### Utility 1: Color Converter

```typescript
/**
 * Converts CSS colors to Tailwind-compatible format
 */
class ColorConverter {
  /**
   * Convert hex to Tailwind color name
   */
  hexToTailwind(hex: string, colorName: string): string {
    // #F8F6F2 → bg-cream
    return `${colorName}`;
  }

  /**
   * Extract all unique colors from CSS
   */
  extractColors(css: string): ColorPalette {
    const hexColors = css.match(/#[0-9A-Fa-f]{6}/g) || [];
    const rgbaColors = css.match(/rgba?\([^)]+\)/g) || [];

    return {
      hex: [...new Set(hexColors)],
      rgba: [...new Set(rgbaColors)],
      named: this.extractNamedColors(css)
    };
  }

  /**
   * Group similar colors
   */
  groupSimilarColors(colors: string[]): ColorGroup[] {
    // Group colors within 10% similarity
    // Returns groups like: primary, secondary, accent, etc.
  }

  /**
   * Generate Tailwind config colors
   */
  generateTailwindColors(colors: ColorPalette): Record<string, string> {
    return {
      'bg-cream': '#F8F6F2',
      'brand-primary': '#1A2332',
      'dark': '#101010',
      // ... more colors
    };
  }
}

// Usage
const converter = new ColorConverter();
const colors = converter.extractColors(htmlStyles);
const tailwindColors = converter.generateTailwindColors(colors);
```

### Utility 2: Spacing Calculator

```typescript
/**
 * Analyzes and converts spacing values
 */
class SpacingCalculator {
  /**
   * Extract all spacing values from CSS
   */
  extractSpacing(css: string): SpacingValues {
    const padding = this.extractProperty(css, 'padding');
    const margin = this.extractProperty(css, 'margin');
    const gap = this.extractProperty(css, 'gap');

    return { padding, margin, gap };
  }

  /**
   * Convert px to Tailwind class
   */
  pxToTailwind(px: string): string {
    const value = parseInt(px);

    // Standard Tailwind values
    const standardMap: Record<number, string> = {
      4: 'p-1',
      8: 'p-2',
      12: 'p-3',
      16: 'p-4',
      20: 'p-5',
      24: 'p-6',
      // ... more
    };

    if (standardMap[value]) {
      return standardMap[value];
    }

    // Custom value
    return `p-[${px}]`;
  }

  /**
   * Identify spacing patterns
   */
  identifyPatterns(spacingValues: string[]): SpacingPattern {
    // Find most commonly used values
    const frequency = this.calculateFrequency(spacingValues);
    const mostCommon = this.getMostCommon(frequency, 5);

    return {
      mostCommon,
      shouldAddToConfig: mostCommon.length > 3,
      recommendations: this.generateRecommendations(mostCommon)
    };
  }
}

// Usage
const calculator = new SpacingCalculator();
const spacing = calculator.extractSpacing(htmlStyles);
const patterns = calculator.identifyPatterns(spacing.padding);
```

### Utility 3: Style Mapper

```typescript
/**
 * Maps inline styles to Tailwind classes
 */
class StyleMapper {
  /**
   * Convert inline style object to Tailwind classes
   */
  inlineToTailwind(style: CSSProperties): string {
    const classes: string[] = [];

    // Layout
    if (style.display) classes.push(this.mapDisplay(style.display));
    if (style.flexDirection) classes.push(this.mapFlexDirection(style.flexDirection));
    if (style.justifyContent) classes.push(this.mapJustifyContent(style.justifyContent));
    if (style.alignItems) classes.push(this.mapAlignItems(style.alignItems));

    // Spacing
    if (style.padding) classes.push(this.mapPadding(style.padding));
    if (style.margin) classes.push(this.mapMargin(style.margin));
    if (style.gap) classes.push(this.mapGap(style.gap));

    // Sizing
    if (style.width) classes.push(this.mapWidth(style.width));
    if (style.height) classes.push(this.mapHeight(style.height));

    // Colors
    if (style.backgroundColor) classes.push(this.mapBackgroundColor(style.backgroundColor));
    if (style.color) classes.push(this.mapTextColor(style.color));

    // Typography
    if (style.fontSize) classes.push(this.mapFontSize(style.fontSize));
    if (style.fontWeight) classes.push(this.mapFontWeight(style.fontWeight));
    if (style.fontFamily) classes.push(this.mapFontFamily(style.fontFamily));

    return classes.filter(Boolean).join(' ');
  }

  /**
   * Map individual CSS properties
   */
  private mapDisplay(display: string): string {
    const map: Record<string, string> = {
      'flex': 'flex',
      'inline-flex': 'inline-flex',
      'grid': 'grid',
      'block': 'block',
      'inline-block': 'inline-block',
      'none': 'hidden'
    };
    return map[display] || '';
  }

  private mapPadding(padding: string): string {
    // "15px" → "p-[15px]"
    // "10px 20px" → "py-[10px] px-[20px]"
    // Handle complex padding values
  }

  // ... more mapping methods
}

// Usage
const mapper = new StyleMapper();
const inlineStyle = {
  display: 'flex',
  padding: '15px',
  backgroundColor: '#F8F6F2',
  gap: '10px'
};
const tailwindClasses = mapper.inlineToTailwind(inlineStyle);
// Output: "flex p-[15px] bg-cream gap-[10px]"
```

### Utility 4: Component Matcher

```typescript
/**
 * Matches HTML sections to React components
 */
class ComponentMatcher {
  /**
   * Match HTML structure to component tree
   */
  matchHTMLToComponents(
    htmlTree: HTMLNode[],
    componentTree: ComponentNode
  ): Match[] {
    const matches: Match[] = [];

    for (const htmlNode of htmlTree) {
      const match = this.findBestMatch(htmlNode, componentTree);
      if (match) {
        matches.push({
          htmlNode,
          component: match,
          confidence: this.calculateConfidence(htmlNode, match),
          styleMapping: this.extractStyleMapping(htmlNode, match)
        });
      }
    }

    return matches;
  }

  /**
   * Find best component match for HTML node
   */
  private findBestMatch(
    htmlNode: HTMLNode,
    componentTree: ComponentNode
  ): ComponentNode | null {
    // Scoring factors:
    // 1. Semantic similarity (class names, data attributes)
    // 2. Structural similarity (children count, nesting)
    // 3. Style similarity (shared CSS properties)

    const candidates = this.getAllComponents(componentTree);
    const scores = candidates.map(comp => ({
      component: comp,
      score: this.calculateMatchScore(htmlNode, comp)
    }));

    scores.sort((a, b) => b.score - a.score);
    return scores[0]?.score > 0.5 ? scores[0].component : null;
  }

  /**
   * Calculate match score between HTML and component
   */
  private calculateMatchScore(html: HTMLNode, component: ComponentNode): number {
    let score = 0;

    // Semantic matching
    if (this.semanticMatch(html, component)) score += 0.4;

    // Structural matching
    if (this.structuralMatch(html, component)) score += 0.3;

    // Style matching
    if (this.styleMatch(html, component)) score += 0.3;

    return score;
  }
}

// Usage
const matcher = new ComponentMatcher();
const matches = matcher.matchHTMLToComponents(htmlTree, componentTree);
matches.forEach(match => {
  console.log(`${match.htmlNode.tag} → ${match.component.name} (${match.confidence}%)`);
});
```

### Utility 5: Validation Checker

```typescript
/**
 * Validates changes before and after application
 */
class ValidationChecker {
  /**
   * Validate that edit won't break component
   */
  async validateEdit(
    filePath: string,
    oldString: string,
    newString: string
  ): Promise<ValidationResult> {
    // Read file
    const content = await this.readFile(filePath);

    // Check if old string exists
    if (!content.includes(oldString)) {
      return {
        valid: false,
        error: 'old_string not found in file'
      };
    }

    // Check if old string is unique
    const occurrences = this.countOccurrences(content, oldString);
    if (occurrences > 1) {
      return {
        valid: false,
        error: `old_string appears ${occurrences} times. Use replace_all or make it unique.`
      };
    }

    // Check if change would break syntax
    const newContent = content.replace(oldString, newString);
    const syntaxValid = await this.checkSyntax(newContent, filePath);

    if (!syntaxValid) {
      return {
        valid: false,
        error: 'Replacement would cause syntax error'
      };
    }

    return { valid: true };
  }

  /**
   * Validate that functionality is preserved
   */
  async validateFunctionality(
    originalPath: string,
    modifiedPath: string
  ): Promise<boolean> {
    const original = await this.parseAST(originalPath);
    const modified = await this.parseAST(modifiedPath);

    // Check that:
    // 1. Same exports
    // 2. Same props
    // 3. Same hooks
    // 4. Same event handlers
    // 5. Same GraphQL queries

    return (
      this.sameExports(original, modified) &&
      this.sameProps(original, modified) &&
      this.sameHooks(original, modified) &&
      this.sameEventHandlers(original, modified) &&
      this.sameQueries(original, modified)
    );
  }
}

// Usage
const validator = new ValidationChecker();
const isValid = await validator.validateEdit(
  '/path/to/Component.tsx',
  'className="old"',
  'className="new"'
);

if (!isValid.valid) {
  console.error('Validation failed:', isValid.error);
}
```

---

## Agent Workflow

### Phase 1: Initialization

```typescript
async function initializeAgent(config: AgentConfig): Promise<AgentState> {
  // 1. Load configuration
  const settings = await loadConfig(config);

  // 2. Initialize tools
  const tools = {
    fileReader: new FileReader(),
    fileWriter: new FileWriter(),
    fileSearch: new FileSearch(),
    htmlParser: new HTMLParser(),
    componentTreeBuilder: new ComponentTreeBuilder(),
    todoManager: new TodoManager()
  };

  // 3. Initialize utilities
  const utils = {
    colorConverter: new ColorConverter(),
    spacingCalculator: new SpacingCalculator(),
    styleMapper: new StyleMapper(),
    componentMatcher: new ComponentMatcher(),
    validationChecker: new ValidationChecker()
  };

  // 4. Create initial state
  const state: AgentState = {
    phase: 'initialization',
    tools,
    utils,
    config: settings,
    progress: {
      currentPhase: 'initialization',
      completedTasks: [],
      pendingTasks: [],
      errors: []
    }
  };

  return state;
}
```

### Phase 2: Analysis

```typescript
async function analyzePhase(state: AgentState): Promise<AnalysisResult> {
  console.log('=== ANALYSIS PHASE ===');

  // 1. Read HTML reference file
  const htmlContent = await state.tools.fileReader({
    file_path: state.config.htmlReferencePath
  });

  // 2. Parse HTML
  const parsed = await state.tools.htmlParser({
    html: htmlContent.content,
    extractStyles: true,
    buildTree: true
  });

  // 3. Extract design patterns
  const colors = state.utils.colorConverter.extractColors(
    JSON.stringify(parsed.styles)
  );

  const spacing = state.utils.spacingCalculator.extractSpacing(
    JSON.stringify(parsed.styles)
  );

  // 4. Build pattern catalog
  const patterns: DesignPatterns = {
    colors: state.utils.colorConverter.generateTailwindColors(colors),
    spacing: state.utils.spacingCalculator.identifyPatterns(
      [...spacing.padding, ...spacing.margin, ...spacing.gap]
    ),
    typography: {
      fontFamily: parsed.typography.fontFamily,
      baseFontSize: parsed.typography.baseFontSize,
      baseFontWeight: parsed.typography.baseFontWeight
    },
    layout: {
      structure: parsed.tree,
      dimensions: parsed.dimensions
    }
  };

  console.log('Analysis complete:', {
    colorsFound: Object.keys(patterns.colors).length,
    spacingPatterns: patterns.spacing.mostCommon.length,
    components: parsed.tree.length
  });

  return {
    patterns,
    htmlTree: parsed.tree,
    success: true
  };
}
```

### Phase 3: Discovery

```typescript
async function discoveryPhase(state: AgentState): Promise<DiscoveryResult> {
  console.log('=== DISCOVERY PHASE ===');

  // 1. Read root component
  const rootContent = await state.tools.fileReader({
    file_path: state.config.rootComponentPath
  });

  // 2. Build component tree
  const componentTree = await state.tools.componentTreeBuilder({
    rootFile: state.config.rootComponentPath,
    maxDepth: 10
  });

  // 3. Collect all component files
  const allComponents = flattenTree(componentTree.tree);

  // 4. Read each component file
  const componentData: ComponentData[] = [];
  for (const comp of allComponents) {
    const content = await state.tools.fileReader({
      file_path: comp.path
    });

    componentData.push({
      ...comp,
      content: content.content,
      hasStyles: content.content.includes('className')
    });
  }

  console.log('Discovery complete:', {
    totalComponents: allComponents.length,
    componentsWithStyles: componentData.filter(c => c.hasStyles).length
  });

  return {
    componentTree: componentTree.tree,
    allComponents: componentData,
    success: true
  };
}
```

### Phase 4: Mapping

```typescript
async function mappingPhase(
  state: AgentState,
  analysisResult: AnalysisResult,
  discoveryResult: DiscoveryResult
): Promise<MappingResult> {
  console.log('=== MAPPING PHASE ===');

  // 1. Match HTML to components
  const matches = state.utils.componentMatcher.matchHTMLToComponents(
    analysisResult.htmlTree,
    discoveryResult.componentTree
  );

  // 2. Create style mappings
  const mappings: StyleMapping[] = [];
  for (const match of matches) {
    const styleMapping = createStyleMapping(
      match.htmlNode,
      match.component,
      analysisResult.patterns,
      state.utils.styleMapper
    );

    mappings.push(styleMapping);
  }

  // 3. Generate Tailwind config updates
  const tailwindUpdates = generateTailwindConfig(
    analysisResult.patterns,
    state.config.tailwindConfigPath
  );

  // 4. Create task list
  const tasks = createTaskList(mappings, tailwindUpdates);

  await state.tools.todoManager({ todos: tasks });

  console.log('Mapping complete:', {
    matches: matches.length,
    mappings: mappings.length,
    tasks: tasks.length
  });

  return {
    mappings,
    tailwindUpdates,
    tasks,
    success: true
  };
}

function createStyleMapping(
  htmlNode: HTMLNode,
  component: ComponentNode,
  patterns: DesignPatterns,
  styleMapper: StyleMapper
): StyleMapping {
  // Extract styles from HTML node
  const htmlStyles = extractInlineStyles(htmlNode);

  // Convert to Tailwind classes
  const tailwindClasses = styleMapper.inlineToTailwind(htmlStyles);

  // Read component to find current classes
  const currentClasses = extractCurrentClasses(component);

  return {
    component: component.name,
    componentPath: component.path,
    htmlSection: htmlNode.tag,
    changes: [
      {
        location: 'className',
        oldValue: currentClasses,
        newValue: tailwindClasses,
        confidence: 0.9
      }
    ]
  };
}
```

### Phase 5: Implementation

```typescript
async function implementationPhase(
  state: AgentState,
  mappingResult: MappingResult
): Promise<ImplementationResult> {
  console.log('=== IMPLEMENTATION PHASE ===');

  const results: EditResult[] = [];
  const errors: Error[] = [];

  // 1. Update Tailwind config first
  console.log('Updating Tailwind config...');
  try {
    const tailwindResult = await updateTailwindConfig(
      state,
      mappingResult.tailwindUpdates
    );
    results.push(tailwindResult);

    await state.tools.todoManager({
      todos: [
        {
          content: 'Update Tailwind config',
          status: 'completed',
          activeForm: 'Updated Tailwind config'
        }
      ]
    });
  } catch (error) {
    errors.push(error);
  }

  // 2. Update components in order
  const sortedMappings = topologicalSort(mappingResult.mappings);

  for (const mapping of sortedMappings) {
    console.log(`Updating ${mapping.component}...`);

    try {
      // Update task status
      await state.tools.todoManager({
        todos: [
          {
            content: `Update ${mapping.component}`,
            status: 'in_progress',
            activeForm: `Updating ${mapping.component}`
          }
        ]
      });

      // Apply changes
      const result = await applyComponentChanges(state, mapping);
      results.push(result);

      // Mark complete
      await state.tools.todoManager({
        todos: [
          {
            content: `Update ${mapping.component}`,
            status: 'completed',
            activeForm: `Updated ${mapping.component}`
          }
        ]
      });

    } catch (error) {
      errors.push({
        component: mapping.component,
        error: error.message
      });
    }
  }

  console.log('Implementation complete:', {
    successful: results.length,
    failed: errors.length
  });

  return {
    results,
    errors,
    success: errors.length === 0
  };
}

async function applyComponentChanges(
  state: AgentState,
  mapping: StyleMapping
): Promise<EditResult> {
  // 1. Read component file
  const content = await state.tools.fileReader({
    file_path: mapping.componentPath
  });

  // 2. For each change
  for (const change of mapping.changes) {
    // 3. Validate change
    const validation = await state.utils.validationChecker.validateEdit(
      mapping.componentPath,
      change.oldValue,
      change.newValue
    );

    if (!validation.valid) {
      throw new Error(`Validation failed: ${validation.error}`);
    }

    // 4. Apply change
    await state.tools.fileWriter({
      file_path: mapping.componentPath,
      old_string: change.oldValue,
      new_string: change.newValue
    });
  }

  return {
    component: mapping.component,
    path: mapping.componentPath,
    changesApplied: mapping.changes.length,
    success: true
  };
}
```

### Phase 6: Verification

```typescript
async function verificationPhase(
  state: AgentState,
  implementationResult: ImplementationResult
): Promise<VerificationResult> {
  console.log('=== VERIFICATION PHASE ===');

  const validations: ValidationResult[] = [];

  // 1. Verify each modified file
  for (const result of implementationResult.results) {
    if (!result.success) continue;

    // Check syntax
    const syntaxValid = await checkSyntax(result.path);

    // Check functionality preserved
    const functionalityValid = await state.utils.validationChecker
      .validateFunctionality(result.path, result.path);

    validations.push({
      component: result.component,
      syntaxValid,
      functionalityValid,
      overall: syntaxValid && functionalityValid
    });
  }

  // 2. Summary
  const allValid = validations.every(v => v.overall);

  console.log('Verification complete:', {
    totalChecked: validations.length,
    allValid,
    failed: validations.filter(v => !v.overall).length
  });

  return {
    validations,
    allValid,
    success: allValid
  };
}
```

---

## Implementation Guide

### Step 1: Set Up Project Structure

```bash
styling-migration-agent/
├── src/
│   ├── main.ts                 # Main agent entry point
│   ├── modules/
│   │   ├── analyzer.ts         # Analysis module
│   │   ├── mapper.ts           # Mapping module
│   │   └── implementer.ts      # Implementation module
│   ├── tools/
│   │   ├── file-reader.ts
│   │   ├── file-writer.ts
│   │   ├── file-search.ts
│   │   ├── html-parser.ts
│   │   ├── component-tree-builder.ts
│   │   └── todo-manager.ts
│   ├── utils/
│   │   ├── color-converter.ts
│   │   ├── spacing-calculator.ts
│   │   ├── style-mapper.ts
│   │   ├── component-matcher.ts
│   │   └── validation-checker.ts
│   ├── types/
│   │   ├── agent.types.ts
│   │   ├── component.types.ts
│   │   └── style.types.ts
│   └── config/
│       └── default-config.ts
├── tests/
├── examples/
└── package.json
```

### Step 2: Define Types

```typescript
// src/types/agent.types.ts
export interface AgentConfig {
  htmlReferencePath: string;
  rootComponentPath: string;
  tailwindConfigPath: string;
  componentDirectory: string;
  maxDepth?: number;
  includeTests?: boolean;
}

export interface AgentState {
  phase: AgentPhase;
  tools: Tools;
  utils: Utilities;
  config: AgentConfig;
  progress: Progress;
}

export type AgentPhase =
  | 'initialization'
  | 'analysis'
  | 'discovery'
  | 'mapping'
  | 'implementation'
  | 'verification'
  | 'complete';

// More types...
```

### Step 3: Implement Core Agent

```typescript
// src/main.ts
import { initializeAgent } from './modules/initialization';
import { analyzePhase } from './modules/analyzer';
import { discoveryPhase } from './modules/discovery';
import { mappingPhase } from './modules/mapper';
import { implementationPhase } from './modules/implementer';
import { verificationPhase } from './modules/verification';

export async function runAgent(config: AgentConfig): Promise<void> {
  try {
    // Initialize
    const state = await initializeAgent(config);

    // Phase 1: Analysis
    state.phase = 'analysis';
    const analysisResult = await analyzePhase(state);

    // Phase 2: Discovery
    state.phase = 'discovery';
    const discoveryResult = await discoveryPhase(state);

    // Phase 3: Mapping
    state.phase = 'mapping';
    const mappingResult = await mappingPhase(
      state,
      analysisResult,
      discoveryResult
    );

    // Phase 4: Implementation
    state.phase = 'implementation';
    const implementationResult = await implementationPhase(
      state,
      mappingResult
    );

    // Phase 5: Verification
    state.phase = 'verification';
    const verificationResult = await verificationPhase(
      state,
      implementationResult
    );

    // Complete
    state.phase = 'complete';
    console.log('✅ Agent completed successfully!');

  } catch (error) {
    console.error('❌ Agent failed:', error);
    throw error;
  }
}

// CLI entry point
if (require.main === module) {
  const config: AgentConfig = {
    htmlReferencePath: process.argv[2],
    rootComponentPath: process.argv[3],
    tailwindConfigPath: process.argv[4],
    componentDirectory: process.argv[5]
  };

  runAgent(config);
}
```

### Step 4: Create Configuration

```typescript
// Agent usage configuration
const config = {
  // Input files
  htmlReferencePath: '/path/to/reference.html',
  rootComponentPath: '/path/to/app/page.tsx',
  tailwindConfigPath: '/path/to/tailwind.config.js',
  componentDirectory: '/path/to/components',

  // Options
  maxDepth: 10,
  includeTests: false,

  // Behavior
  autoApply: false,  // If false, generates preview only
  createBackup: true,
  verbose: true
};
```

---

## Example Agent Code

### Complete Minimal Agent

```typescript
import * as fs from 'fs/promises';
import * as path from 'path';
import { glob } from 'glob';

class SimpleStylingAgent {
  async run(htmlPath: string, rootComponent: string) {
    console.log('Starting Styling Migration Agent...\n');

    // Phase 1: Analyze HTML
    console.log('Phase 1: Analyzing HTML...');
    const htmlContent = await fs.readFile(htmlPath, 'utf-8');
    const patterns = this.analyzeHTML(htmlContent);
    console.log('Found:', patterns);

    // Phase 2: Discover Components
    console.log('\nPhase 2: Discovering components...');
    const components = await this.discoverComponents(rootComponent);
    console.log(`Found ${components.length} components`);

    // Phase 3: Map & Implement
    console.log('\nPhase 3: Applying changes...');
    for (const component of components) {
      await this.updateComponent(component, patterns);
    }

    console.log('\n✅ Complete!');
  }

  analyzeHTML(html: string) {
    // Extract colors
    const colors = [...new Set(
      html.match(/#[0-9A-Fa-f]{6}/g) || []
    )];

    // Extract spacing
    const spacing = [...new Set(
      html.match(/padding: (\d+px)/g)?.map(m => m.split(': ')[1]) || []
    )];

    return { colors, spacing };
  }

  async discoverComponents(root: string) {
    const dir = path.dirname(root);
    const files = await glob(`${dir}/**/*.tsx`);
    return files;
  }

  async updateComponent(filePath: string, patterns: any) {
    const content = await fs.readFile(filePath, 'utf-8');

    // Simple replacement example
    let updated = content;

    // Replace colors
    if (patterns.colors.includes('#F8F6F2')) {
      updated = updated.replace(/bg-white/g, 'bg-cream');
    }

    await fs.writeFile(filePath, updated);
    console.log(`Updated: ${filePath}`);
  }
}

// Usage
const agent = new SimpleStylingAgent();
agent.run(
  '/path/to/reference.html',
  '/path/to/app/page.tsx'
);
```

---

## Testing & Validation

### Test Suite Structure

```typescript
// tests/analyzer.test.ts
describe('Analyzer Module', () => {
  it('should extract colors from HTML', () => {
    const html = '<div style="background: #F8F6F2;">Test</div>';
    const analyzer = new Analyzer();
    const result = analyzer.extractColors(html);

    expect(result.hex).toContain('#F8F6F2');
  });

  it('should identify spacing patterns', () => {
    const html = '<div style="padding: 15px;">Test</div>';
    const analyzer = new Analyzer();
    const result = analyzer.extractSpacing(html);

    expect(result.padding).toContain('15px');
  });
});

// tests/mapper.test.ts
describe('Mapper Module', () => {
  it('should match HTML to components', () => {
    const htmlTree = parseHTML('<div class="sidebar">...</div>');
    const componentTree = buildTree('page.tsx');

    const matcher = new ComponentMatcher();
    const matches = matcher.matchHTMLToComponents(htmlTree, componentTree);

    expect(matches.length).toBeGreaterThan(0);
  });
});

// tests/integration.test.ts
describe('Full Agent Flow', () => {
  it('should complete full migration', async () => {
    const config = {
      htmlReferencePath: './fixtures/test.html',
      rootComponentPath: './fixtures/page.tsx',
      tailwindConfigPath: './fixtures/tailwind.config.js',
      componentDirectory: './fixtures/components'
    };

    const result = await runAgent(config);

    expect(result.success).toBe(true);
    expect(result.errors.length).toBe(0);
  });
});
```

---

## Summary

This blueprint provides:

✅ **Complete System Architecture** - Modular design with clear separation of concerns
✅ **Detailed Prompts** - For main agent and all modules
✅ **Required Tools** - 6 essential tools with full specifications
✅ **Utility Functions** - 5 key utilities with implementation details
✅ **Full Workflow** - 6 phases from initialization to verification
✅ **Implementation Guide** - Step-by-step setup instructions
✅ **Example Code** - Both minimal and complete implementations
✅ **Testing Strategy** - Comprehensive test suite structure

Use this blueprint to create a robust, autonomous agent for HTML to React styling migration!
