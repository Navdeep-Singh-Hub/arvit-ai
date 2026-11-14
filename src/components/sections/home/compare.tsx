import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { LogoMark } from "@/components/icons/logo";

/** ARVIT vs. a regular tablet with apps added. Keep every row a plain product fact. */
const ROWS = [
  {
    feature: "Built for",
    arvit: ["Communication", "One job, done well"],
    other: ["Everything", "Games, video, browsing"],
  },
  {
    feature: "Symbol boards + voice",
    arvit: ["Ready on day one", "Boards, speech, prediction"],
    other: ["Extra apps", "Find, buy and set up yourself"],
  },
  {
    feature: "Languages",
    arvit: ["5 Indian languages", "English, Hindi, Punjabi, Tamil, Telugu"],
    other: ["Mostly English", "Indian-language AAC is hard to find"],
  },
  {
    feature: "Emergency alert",
    arvit: ["One tap", "WhatsApp call to both caregivers"],
    other: ["Not built in", "Child must unlock and find an app"],
  },
  {
    feature: "Hands-free access",
    arvit: ["Eye control", "Look to highlight, blink to select"],
    other: ["Touch only", "Hard for children who can't tap"],
  },
  {
    feature: "Parent progress",
    arvit: ["Weekly report", "Sent to caregiver phones every Sunday"],
    other: ["Not included", "No picture of how it's going"],
  },
  {
    feature: "Without internet",
    arvit: ["Keeps talking", "Offline mode for boards and voice"],
    other: ["Depends on the app", "Many need a connection"],
  },
  {
    feature: "Setup + support",
    arvit: ["We call you", "Real people help you start"],
    other: ["On your own", "Tutorials and trial and error"],
  },
];

export function Compare() {
  return (
    <section className="bg-zigzag-warm py-16 sm:py-20">
      <Container className="max-w-[1280px]">
        <SectionHeading align="center" title="Why Parents Choose ARVIT" accent="ARVIT" />

        <div className="mt-12 overflow-x-auto pb-4">
          <div className="relative min-w-[680px] rounded-[20px] border border-black/15 bg-white">
            {/* Teal frame around the ARVIT column */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-3 -top-3 left-[25%] w-[38%] rounded-[14px] border-[5px] border-[#28958a] shadow-[0_0_30px_rgb(40_149_138_/_0.45)]"
            />
            <table className="w-full table-fixed border-collapse text-left">
              <colgroup>
                <col className="w-[25%]" />
                <col className="w-[38%]" />
                <col className="w-[37%]" />
              </colgroup>
              <thead>
                <tr className="border-b-2 border-black/15">
                  <th scope="col" className="px-6 py-6 text-sm font-semibold uppercase text-black">
                    Feature
                  </th>
                  <th scope="col" className="px-6 py-6">
                    <span className="flex items-center gap-3">
                      <LogoMark className="size-12 shrink-0" />
                      <span>
                        <span className="font-display block text-xl text-black">ARVIT</span>
                        <span className="mt-1 inline-block rounded-full border border-black/15 px-3 py-1 text-xs font-semibold uppercase text-[#28958a]">
                          Best for communication
                        </span>
                      </span>
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-6">
                    <span className="block text-xl font-medium text-black/75">Regular tablet</span>
                    <span className="mt-1 inline-block rounded-full border border-black/15 px-3 py-1 text-xs font-medium uppercase text-black/70">
                      Best for everything else
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.feature} className="border-b border-black/10 last:border-b-0">
                    <th scope="row" className="px-6 py-5 text-sm font-semibold uppercase text-black">
                      {row.feature}
                    </th>
                    <td className="px-6 py-5">
                      <span className="font-display block text-lg leading-tight text-black">{row.arvit[0]}</span>
                      <span className="mt-1 block text-base text-[#28958a]">{row.arvit[1]}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="block text-lg leading-tight text-black/75">{row.other[0]}</span>
                      <span className="mt-1 block text-sm text-black/55">{row.other[1]}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  );
}
