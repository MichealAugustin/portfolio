import { useState } from "react";
import { engineInfo } from "../data/portfolio";

function EngineBadge({ engine }) {
  const [imageFailed, setImageFailed] = useState(false);
  const info = engineInfo[engine];

  if (!info?.icon || imageFailed) {
    return (
      <span className="engine-badge">
        {imageFailed ? info.fallback || info.label || engine : engine}
      </span>
    );
  }

  return (
    <span className="engine-badge">
      <img
        src={info.icon}
        alt={info.alt}
        onError={() => setImageFailed(true)}
      />
      {info.label}
    </span>
  );
}

export default EngineBadge;
