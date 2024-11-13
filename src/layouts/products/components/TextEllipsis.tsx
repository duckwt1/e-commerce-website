// src/components/TextEllipsis.tsx
import React from 'react';

interface TextEllipsisProps {
    text: string;
    limit: number;
}

const TextEllipsis: React.FC<TextEllipsisProps> = ({ text, limit }) => {
    if (text.length <= limit) {
        return <span>{text}</span>;
    }
    return <span>{text.substring(0, limit)}...</span>;
};

export default TextEllipsis;
