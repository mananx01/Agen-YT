import React, { useState } from 'react'

function VideoDescription({description} : {description: string}) {

    const [showFull, setShowFull] = useState(false);
    const CHARACTER_LIMIT = 200;

    const truncateText = (text: string, limit: number) => {
        if (text.length <= limit) return text;
        const truncated = text.slice(0, limit);
        const lastSpace = truncated.lastIndexOf(' ');
        return truncated.slice(0, lastSpace) + '…';
    };

    const formatDescription = (text: string) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const lines = text.split('\n');
    
        return lines.map((line, i) => (
            <p key={i} className="whitespace-pre-wrap">
            {line.split(urlRegex).map((chunk, index) =>
                urlRegex.test(chunk) ? (
                <a
                    key={index}
                    href={chunk}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                >
                    {chunk}
                </a>
                ) : (
                chunk
                )
            )}
            </p>
        ));
        
    };


    const displayedText = showFull
        ? description
        : truncateText(description, CHARACTER_LIMIT);

return (
    <div className="text-sm text-gray-200 bg-gray-950 border border-gray-700 rounded-lg p-3">
        <div className='font-bold text-lg text-gray-200'>Description</div>
        {formatDescription(displayedText)}
        {description.length > CHARACTER_LIMIT && (
        <button
            onClick={() => setShowFull(!showFull)}
            className="mt-2 text-blue-400 font-semibold hover:underline cursor-pointer"
        >
            {showFull ? 'Show less' : 'Show more'}
        </button>
        )}
    </div>
    );

        
}

export default VideoDescription
