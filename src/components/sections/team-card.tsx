import { ImageFrame } from "@/components/ui/image-frame";
import type { TeamMember } from "@/content/team";

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="border-stone grid grid-cols-1 gap-6 border-t py-10 last:border-b sm:grid-cols-[160px_1fr] sm:gap-10">
      <ImageFrame
        category="people"
        className="aspect-square w-40 rounded-full sm:w-full"
      />
      <div>
        <h3 className="font-display text-coffee text-2xl">{member.name}</h3>
        <span className="text-caption text-bronze-ink mt-1 block font-medium tracking-[0.1em] uppercase">
          {member.role}
        </span>
        <p className="text-body text-foreground/70 mt-4 max-w-2xl">{member.bio}</p>
      </div>
    </div>
  );
}
