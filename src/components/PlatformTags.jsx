import { platformInfo } from "../data/portfolio";

function PlatformTags({ platforms }) {
  return (
    <span className="platform-tags">
      {platforms.map((platform) => {
        const Icon = platformInfo[platform]?.Icon;

        return (
          <span className="platform-tag" key={platform}>
            {Icon && <Icon aria-hidden="true" />}
            {platform}
          </span>
        );
      })}
    </span>
  );
}

export default PlatformTags;
