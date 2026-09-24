export const markdownComponents = {
  code({ className, children, node, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    const isInline = !match && !String(children).includes("\n");

    if (isInline) {
      return (
        <code
          className="bg-[#0B0E14] border border-white/10 text-[#2DD4BF] px-1.5 py-0.5 rounded text-[0.85em]"
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <div className="my-4 rounded-md border border-white/10 overflow-hidden inline-block w-full">
        {match && (
          <div className="px-4 py-2 bg-[#0D1017] border-b border-white/5 text-xs text-[#8B8FA3]">
            {match[1]}
          </div>
        )}

        <div className="bg-[#0B0E14] p-4 overflow-x-auto m-0">
          <code className="text-[#2DD4BF] text-sm leading-relaxed" {...props}>
            {children}
          </code>
        </div>
      </div>
    );
  },

  p({ children }) {
    return <p className="text-gray-300 leading-7 mb-4">{children}</p>;
  },

  h1({ children }) {
    return (
      <h1 className="text-xl font-semibold text-white mb-4 mt-6">{children}</h1>
    );
  },

  h2({ children }) {
    return (
      <h2 className="text-lg font-semibold text-white mb-3 mt-6">{children}</h2>
    );
  },

  h3({ children }) {
    return (
      <h3 className="text-base font-semibold text-white mb-2 mt-5">
        {children}
      </h3>
    );
  },

  ul({ children }) {
    return (
      <ul className="list-disc ml-6 mb-4 space-y-2 text-gray-300">
        {children}
      </ul>
    );
  },

  ol({ children }) {
    return (
      <ol className="list-decimal ml-6 mb-4 space-y-2 text-gray-300">
        {children}
      </ol>
    );
  },

  strong({ children }) {
    return <strong className="text-white font-semibold">{children}</strong>;
  },

  a({ children, href }) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#2DD4BF] hover:underline"
      >
        {children}
      </a>
    );
  },

  blockquote({ children }) {
    return (
      <blockquote className="border-l-2 border-[#2DD4BF] pl-4 my-4 text-gray-400 italic">
        {children}
      </blockquote>
    );
  },
};
