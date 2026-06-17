import { createPortal } from 'react-dom';

interface FloatingMessagesButtonProps {
  onClick: () => void;
  badge?: number;
  userAvatar?: string;
}

export function FloatingMessagesButton({
  onClick,
  badge = 0,
  userAvatar,
}: FloatingMessagesButtonProps) {
  const button = (
    <button
      onClick={onClick}
      className="
        fixed
        right-4
        bottom-[calc(env(safe-area-inset-bottom)+16px)]
        z-[9999]
        flex
        items-center
        gap-3
        px-4
        py-2.5
        rounded-full
        shadow-2xl
        transition-all
        duration-300
        bg-gradient-to-r
        from-purple-600
        via-pink-500
        to-orange-500
      "
    >
      {/* Avatar */}
      <div className="relative">
        {userAvatar ? (
          <img 
            src={userAvatar} 
            alt="User" 
            className="w-9 h-9 rounded-full object-cover border-2 border-white"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
            U
          </div>
        )}
        {/* Online dot */}
        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
      </div>

      {/* Label */}
      <span className="text-white font-semibold text-sm whitespace-nowrap">
        Messaging
      </span>

      {/* Optional badge */}
      {badge > 0 && (
        <span className="
          ml-1
          min-w-[20px]
          h-5
          px-1.5
          bg-red-500
          text-white
          text-xs
          font-bold
          rounded-full
          flex
          items-center
          justify-center
        ">
          {badge}
        </span>
      )}
    </button>
  );

  // Portal to document.body to avoid clipping and stacking context issues
  return createPortal(button, document.body);
}