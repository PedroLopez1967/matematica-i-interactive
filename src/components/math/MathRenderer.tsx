import React from 'react';

interface MathRendererProps {
    expression: string;
    inline?: boolean;
    className?: string;
}

export const MathRenderer: React.FC<MathRendererProps> = ({
    expression,
    inline = false,
    className = ''
}) => {
    // Basic parser for LaTeX to HTML
    const parseLatex = (latex: string): React.ReactNode[] => {
        const parts: React.ReactNode[] = [];
        let remaining = latex;

        while (remaining.length > 0) {
            // Fraction: \frac{num}{den}
            if (remaining.startsWith('\\frac{')) {
                const endNum = findClosingBrace(remaining, 6);
                if (endNum !== -1) {
                    const num = remaining.substring(6, endNum);
                    const restAfterNum = remaining.substring(endNum + 1);
                    if (restAfterNum.startsWith('{')) {
                        const endDen = findClosingBrace(restAfterNum, 1);
                        if (endDen !== -1) {
                            const den = restAfterNum.substring(1, endDen);
                            parts.push(
                                <span key={parts.length} className="math-fraction">
                                    <span className="math-numerator">{parseLatex(num)}</span>
                                    <span className="math-denominator">{parseLatex(den)}</span>
                                </span>
                            );
                            remaining = restAfterNum.substring(endDen + 1);
                            continue;
                        }
                    }
                }
            }

            // Square root: \sqrt{content}
            if (remaining.startsWith('\\sqrt{')) {
                const endContent = findClosingBrace(remaining, 6);
                if (endContent !== -1) {
                    const content = remaining.substring(6, endContent);
                    parts.push(
                        <span key={parts.length} className="math-sqrt">
                            <span className="math-sqrt-symbol">√</span>
                            <span className="math-sqrt-content">{parseLatex(content)}</span>
                        </span>
                    );
                    remaining = remaining.substring(endContent + 1);
                    continue;
                }
            }

            // Superscript: ^2 or ^{...}
            if (remaining.startsWith('^')) {
                if (remaining.startsWith('^{')) {
                    const endSup = findClosingBrace(remaining, 2);
                    if (endSup !== -1) {
                        const sup = remaining.substring(2, endSup);
                        parts.push(<sup key={parts.length}>{parseLatex(sup)}</sup>);
                        remaining = remaining.substring(endSup + 1);
                        continue;
                    }
                } else {
                    // Single char superscript
                    const sup = remaining[1];
                    parts.push(<sup key={parts.length}>{sup}</sup>);
                    remaining = remaining.substring(2);
                    continue;
                }
            }

            // Subscript: _2 or _{...}
            if (remaining.startsWith('_')) {
                if (remaining.startsWith('_{')) {
                    const endSub = findClosingBrace(remaining, 2);
                    if (endSub !== -1) {
                        const sub = remaining.substring(2, endSub);
                        parts.push(<sub key={parts.length}>{parseLatex(sub)}</sub>);
                        remaining = remaining.substring(endSub + 1);
                        continue;
                    }
                } else {
                    // Single char subscript
                    const sub = remaining[1];
                    parts.push(<sub key={parts.length}>{sub}</sub>);
                    remaining = remaining.substring(2);
                    continue;
                }
            }

            // Greek letters and symbols
            const symbolMatch = remaining.match(/^\\([a-zA-Z]+)/);
            if (symbolMatch) {
                const command = symbolMatch[1];
                const symbol = getSymbol(command);
                if (symbol) {
                    parts.push(<span key={parts.length}>{symbol}</span>);
                    remaining = remaining.substring(symbolMatch[0].length);
                    continue;
                }
            }

            // Text inside \text{...}
            if (remaining.startsWith('\\text{')) {
                const endText = findClosingBrace(remaining, 6);
                if (endText !== -1) {
                    const text = remaining.substring(6, endText);
                    parts.push(<span key={parts.length} className="font-normal not-italic">{text}</span>);
                    remaining = remaining.substring(endText + 1);
                    continue;
                }
            }

            // Left/Right delimiters (ignore for now or map to simple chars)
            if (remaining.startsWith('\\left(') || remaining.startsWith('\\right)')) {
                parts.push(<span key={parts.length}>{remaining.startsWith('\\left(') ? '(' : ')'}</span>);
                remaining = remaining.substring(6); // \left( is 6 chars, \right) is 7 but close enough for simple logic? No.
                // Actually \left( is 6, \right) is 7.
                if (remaining.startsWith('\\left(')) remaining = remaining.substring(6);
                else remaining = remaining.substring(7);
                continue;
            }
            if (remaining.startsWith('\\left[') || remaining.startsWith('\\right]')) {
                parts.push(<span key={parts.length}>{remaining.startsWith('\\left[') ? '[' : ']'}</span>);
                if (remaining.startsWith('\\left[')) remaining = remaining.substring(6);
                else remaining = remaining.substring(7);
                continue;
            }


            // Regular characters
            parts.push(remaining[0]);
            remaining = remaining.substring(1);
        }

        return parts;
    };

    const findClosingBrace = (str: string, startIndex: number): number => {
        let depth = 1;
        for (let i = startIndex; i < str.length; i++) {
            if (str[i] === '{') depth++;
            if (str[i] === '}') depth--;
            if (depth === 0) return i;
        }
        return -1;
    };

    const getSymbol = (command: string): string | null => {
        const symbols: Record<string, string> = {
            'pi': 'π',
            'theta': 'θ',
            'alpha': 'α',
            'beta': 'β',
            'gamma': 'γ',
            'Delta': 'Δ',
            'lambda': 'λ',
            'sigma': 'σ',
            'infty': '∞',
            'le': '≤',
            'ge': '≥',
            'neq': '≠',
            'approx': '≈',
            'pm': '±',
            'cdot': '·',
            'times': '×',
            'div': '÷',
            'cup': '∪',
            'cap': '∩',
            'in': '∈',
            'notin': '∉',
            'subset': '⊂',
            'subseteq': '⊆',
            'forall': '∀',
            'exists': '∃',
            'rightarrow': '→',
            'leftarrow': '←',
            'implies': '⇒',
            'perp': '⊥',
            'circ': '°',
            'angle': '∠',
            'mid': '|',
            'mathbb': '', // Ignore mathbb for now or handle specifically
            'R': 'ℝ', // Handle \mathbb{R} if parsed as symbol? No, \mathbb{R} is \mathbb then {R}
        };

        // Special handling for \mathbb{R} which might come as command 'mathbb' then content 'R'
        // But here we are just matching commands.
        // If the command is not in the list, we might want to return null so it's treated as text or handled otherwise?
        // For now, let's just return the mapping.

        return symbols[command] || null;
    };

    // Pre-process for specific patterns like \mathbb{R}
    let processedExpression = expression
        .replace(/\\mathbb{R}/g, 'ℝ')
        .replace(/\\mathbb{N}/g, 'ℕ')
        .replace(/\\mathbb{Z}/g, 'ℤ')
        .replace(/\\,/g, ' '); // Thin space

    return (
        <span className={`${inline ? 'math-inline' : 'math-display'} ${className}`}>
            {parseLatex(processedExpression)}
        </span>
    );
};
