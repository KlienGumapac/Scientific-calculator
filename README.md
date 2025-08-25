# Scientific Calculator

A modern, feature-rich scientific calculator built with React, TypeScript, and Tailwind CSS. This calculator provides both basic arithmetic operations and advanced scientific functions with a beautiful, responsive interface.

## Features

### 🧮 Core Calculator Functions

- Basic arithmetic operations (+, -, ×, ÷)
- Decimal point support
- Clear (C) and Clear Entry (CE) functions
- Backspace functionality
- Keyboard support

### 🔬 Scientific Functions

- **Trigonometric Functions**: sin, cos, tan, asin, acos, atan
- **Hyperbolic Functions**: sinh, cosh, tanh
- **Logarithmic Functions**: ln, log (base 10), log₂ (base 2)
- **Power & Root Functions**: √, ∛, x², x³, xʸ
- **Other Functions**: factorial, absolute value, exponential
- **Constants**: π (pi), e (Euler's number), random numbers

### 💾 Memory Functions

- Memory Clear (MC)
- Memory Recall (MR)
- Memory Add (M+)
- Memory Subtract (M-)
- Visual memory indicator

### 📚 History

- Automatic calculation history
- Click to reuse previous calculations
- Timestamp for each entry
- Clear history option

### 🎨 User Experience

- **Dark/Light Theme Toggle**: Switch between themes
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Keyboard Support**: Full keyboard navigation
- **Angle Mode**: Toggle between degrees and radians
- **Scientific Mode**: Toggle between standard and scientific calculator
- **Smooth Animations**: Powered by Framer Motion

### ⌨️ Keyboard Shortcuts

- Numbers: `0-9`
- Operators: `+`, `-`, `*`, `/`
- Enter/Equals: `Enter` or `=`
- Clear: `Escape`
- Backspace: `Backspace`
- Parentheses: `(`, `)`

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Mathematics**: Math.js
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Form Handling**: React Hook Form

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd calcu
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── Calculator/
│   │   ├── Calculator.tsx          # Main calculator component
│   │   ├── CalculatorDisplay.tsx   # Display component
│   │   └── CalculatorButtons.tsx   # Button grid component
│   ├── ScientificPanel/
│   │   └── ScientificPanel.tsx     # Scientific functions panel
│   ├── History/
│   │   └── History.tsx             # Calculation history
│   ├── Memory/
│   │   └── Memory.tsx              # Memory functions
│   └── ThemeToggle/
│       └── ThemeToggle.tsx         # Theme switcher
├── constants/
│   └── calculatorButtons.ts        # Button configurations
├── types/
│   └── calculator.ts               # TypeScript type definitions
├── utils/
│   └── calculations.ts             # Mathematical functions
└── App.tsx                         # Main app component
```

## Usage

### Basic Operations

1. Click the number buttons or use your keyboard to input numbers
2. Use operator buttons (+, -, ×, ÷) for calculations
3. Press Enter or click = to see the result

### Scientific Functions

1. Click "Scientific" to enable scientific mode
2. Use the categorized tabs to access different function groups
3. Functions will be added to your expression with proper parentheses

### Memory Operations

- **M+**: Add current value to memory
- **M-**: Subtract current value from memory
- **MR**: Recall value from memory
- **MC**: Clear memory

### History

- Previous calculations appear in the history panel
- Click any history entry to reuse it
- Use the trash icon to clear history

### Theme Switching

- Click the sun/moon icon in the top-right corner
- The calculator will remember your preference

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Math.js](https://mathjs.org/) for mathematical operations
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Lucide React](https://lucide.dev/) for icons

## Future Enhancements

- [ ] Graphing capabilities
- [ ] Unit conversions
- [ ] Statistical functions
- [ ] Matrix operations
- [ ] Equation solver
- [ ] Export/import calculation history
- [ ] Custom themes
- [ ] Accessibility improvements
- [ ] PWA support
