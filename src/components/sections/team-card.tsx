import { ImageFrame } from "@/components/ui/image-frame";
import type { TeamMember } from "@/content/team";

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="grid grid-cols-1 gap-6 border-t border-stone py-10 sm:grid-cols-[160px_1fr] sm:gap-10 last:border-b">
      <ImageFrame category="people" className="aspect-square w-40 rounded-full sm:w-full" />
      <div>
        <h3 className="font-display text-2xl text-coffee">{member.name}</h3>
        <span className="mt-1 block text-caption font-medium tracking-[0.1em] text-bronze-ink uppercase">
          {member.role}
        </span>
        <p className="mt-4 max-w-2xl text-body text-foreground/70">{member.bio}</p>
      </div>
    </div>
  );
}
