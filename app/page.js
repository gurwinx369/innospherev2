import Threads from "@/components/BgLines";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

export default function Page() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#07070E]">
      {/* BACKGROUND — React Bits Threads component, full-screen fixed */}
      <div className="fixed inset-0 z-0">
        <Threads
          color={[0.47, 0.22, 0.93]}
          colors={["#1452b8", "#1e46a0"]}
          amplitude={2.5}
          distance={0}
          enableMouseInteraction={true}
          className="w-full h-full"
        />
      </div>

      {/* NOISE GRAIN OVERLAY — adds film texture, premium signal */}
      <div
        className="fixed inset-0 z-[1] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }}
      />

      <Navbar />

      <HeroSection />
    </main>
  );
}
