import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, Clock } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface VerificationBadgeProps {
  status: "Verified" | "Under Review" | "Disputed" | "Rejected"
  size?: "sm" | "md" | "lg"
  showIcon?: boolean
  showTooltip?: boolean
}

export function VerificationBadge({
  status,
  size = "md",
  showIcon = true,
  showTooltip = true,
}: VerificationBadgeProps) {
  const getStatusDetails = () => {
    switch (status) {
      case "Verified":
        return {
          icon: <CheckCircle className={size === "sm" ? "h-3 w-3" : "h-4 w-4"} />,
          variant: "default",
          tooltip: "This article has been verified as accurate by the community.",
        }
      case "Under Review":
        return {
          icon: <Clock className={size === "sm" ? "h-3 w-3" : "h-4 w-4"} />,
          variant: "outline" as const,
          tooltip: "This article is currently being analyzed and validated.",
        }
      case "Disputed":
        return {
          icon: <AlertTriangle className={size === "sm" ? "h-3 w-3" : "h-4 w-4"} />,
          variant: "secondary" as const,
          tooltip: "This article has conflicting analyses and validations.",
        }
      case "Rejected":
        return {
          icon: <AlertTriangle className={size === "sm" ? "h-3 w-3" : "h-4 w-4"} />,
          variant: "destructive" as const,
          tooltip: "This article has been found to contain significant inaccuracies.",
        }
      default:
        return {
          icon: <Clock className={size === "sm" ? "h-3 w-3" : "h-4 w-4"} />,
          variant: "outline" as const,
          tooltip: "Status unknown",
        }
    }
  }

  const { icon, variant, tooltip } = getStatusDetails()

  const badge = (
    <Badge
      variant={variant}
      className={`
        ${size === "sm" ? "text-xs py-0 h-5" : ""} 
        ${size === "lg" ? "text-sm py-1 px-3" : ""}
        ${showIcon ? "pl-1.5" : ""}
      `}
    >
      {showIcon && <span className="mr-1">{icon}</span>}
      {status}
    </Badge>
  )

  if (showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{badge}</TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return badge
}
