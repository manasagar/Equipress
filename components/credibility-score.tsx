import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface CredibilityScoreProps {
  score: number
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  showTooltip?: boolean
}

export function CredibilityScore({ score, size = "md", showLabel = true, showTooltip = true }: CredibilityScoreProps) {
  const getScoreColor = () => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  const scoreDisplay = (
    <div className="flex flex-col gap-1">
      {showLabel && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Credibility Score</span>
          <span className="text-sm font-bold">{score}/100</span>
        </div>
      )}
      <div className="relative">
        <Progress value={score} className={`h-${size === "sm" ? "1" : size === "lg" ? "3" : "2"} w-full`} />
        <div
          className={`absolute top-0 h-full ${getScoreColor()} transition-all`}
          style={{ width: `${score}%`, maxWidth: "100%" }}
        />
      </div>
      {!showLabel && (
        <div className="text-right">
          <span className="text-xs font-medium">{score}/100</span>
        </div>
      )}
    </div>
  )

  if (showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{scoreDisplay}</TooltipTrigger>
          <TooltipContent>
            <p>
              {score >= 80
                ? "Highly credible contributor with a strong track record."
                : score >= 60
                  ? "Moderately credible contributor with a good track record."
                  : "New or low-credibility contributor. Exercise caution."}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return scoreDisplay
}
