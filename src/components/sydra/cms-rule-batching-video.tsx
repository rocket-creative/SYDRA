import {
  CMS_RULE_BATCHING_VIDEO,
  getCmsRuleBatchingVideoUrl,
} from "@/lib/content/videos/cms-rule-batching";
import { textStyles } from "@/lib/typography";

type CmsRuleBatchingVideoProps = {
  className?: string;
};

/**
 * Always shows the inline transcript. Embeds media only when
 * NEXT_PUBLIC_CMS_RULE_BATCHING_VIDEO_URL is set.
 */
export function CmsRuleBatchingVideo({ className = "" }: CmsRuleBatchingVideoProps) {
  const videoUrl = getCmsRuleBatchingVideoUrl();

  return (
    <aside
      aria-labelledby="heading-cms-rule-batching-video"
      className={`prose-measure border-t border-rule pt-10 ${className}`.trim()}
    >
      <h2 className={textStyles.subsectionTitle} id="heading-cms-rule-batching-video">
        {CMS_RULE_BATCHING_VIDEO.name}
      </h2>
      <p className={`${textStyles.body} mt-3`}>{CMS_RULE_BATCHING_VIDEO.description}</p>

      {videoUrl ? (
        <div className="mt-6 aspect-video w-full overflow-hidden bg-stone-100">
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
            src={videoUrl}
            title={CMS_RULE_BATCHING_VIDEO.name}
          />
        </div>
      ) : null}

      <details className="group mt-6">
        <summary className="flex min-h-11 cursor-pointer list-none items-center text-sm font-semibold text-brand marker:content-none [&::-webkit-details-marker]:hidden">
          <span className="inline-flex items-center gap-2">
            Transcript
            <span aria-hidden className="text-body/50 transition group-open:rotate-180">
              ▾
            </span>
          </span>
        </summary>
        <p className={`${textStyles.body} mt-3`}>{CMS_RULE_BATCHING_VIDEO.transcript}</p>
      </details>
    </aside>
  );
}
