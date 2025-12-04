
import React from 'react';
import { Message } from '../types';
import { UserIcon } from './icons';
import { MomentumLogo } from './MomentumLogo';

const formatText = (text: string) => {
  const linkRegex = /(https?:\/\/[^\s]+)/g;
  const boldRegex = /\*\*(.*?)\*\*/g;
  const listRegex = /^\s*[-*]\s(.*)/gm;

  let formattedText = text
    .replace(linkRegex, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-momentum-green-400 underline hover:text-momentum-green-500">$1</a>')
    .replace(boldRegex, '<strong class="font-semibold">$1</strong>');

  if (listRegex.test(formattedText)) {
    formattedText = formattedText.replace(listRegex, '<li>$1</li>');
    formattedText = `<ul>${formattedText}</ul>`.replace(/<\/li>\n/g, '</li>').replace(/<\/li><ul>/g, '</li></ul>').replace(/<\/ul><li>/g, '</ul><li>');
  }

  // A simple way to handle lists that are not at the start of the string
  const processedHtml = formattedText.replace(/\n/g, '<br />').replace(/<br \/>\s*<li>/g, '<li>');

  return <div className="prose prose-invert prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: processedHtml }} />;
};

const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  const isModel = message.role === 'model';

  if (isModel) {
    return (
      <div className="flex items-start space-x-4">
        <div className="w-8 h-8 rounded-full bg-black flex-shrink-0 flex items-center justify-center ring-1 ring-gray-600 overflow-hidden">
          <MomentumLogo />
        </div>
        <div className="bg-gray-800 rounded-xl rounded-tl-none p-4 text-gray-200 max-w-xl lg:max-w-2xl">
          {formatText(message.text)}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-end space-x-4">
      <div className="bg-momentum-green-500 rounded-xl rounded-tr-none p-4 text-white max-w-xl lg:max-w-2xl">
        {formatText(message.text)}
      </div>
      <div className="w-8 h-8 rounded-full bg-gray-600 flex-shrink-0 flex items-center justify-center ring-1 ring-gray-500">
        <UserIcon />
      </div>
    </div>
  );
};

export default ChatMessage;
