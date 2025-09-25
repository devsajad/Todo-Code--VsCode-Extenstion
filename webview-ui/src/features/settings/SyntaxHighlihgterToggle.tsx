import ToggleSwitch from "@/components/ToggleSwitch";
import React from "react";

type PropsType = {
  onToggle: () => void;
  highlighterEnabled: boolean;
};

const SyntaxHighlihgterToggle = ({
  onToggle,
  highlighterEnabled,
}: PropsType) => {
  return (
    <div className="flex flex-col mb-8 space-y-1">
      <label className="font-medium text-base mb-2">Comment Highlighting</label>
      <div className="flex items-center gap-2">
        <ToggleSwitch enabled={highlighterEnabled} onChange={onToggle} />
        <span className="text-sm text-gray-subtext">
          {highlighterEnabled ? "Enabled" : "Disabled"}
        </span>
      </div>
    </div>
  );
};

export default SyntaxHighlihgterToggle;
