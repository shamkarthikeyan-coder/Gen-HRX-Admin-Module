import svgPaths from "./svg-k8nwao3y7t";
import { imgVector } from "./svg-l204t";

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p33f6b680} id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M15.8333 10H4.16667" id="Vector_2" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="relative rounded-[16777200px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[56px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[16px] relative size-full">
          <Button />
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-white h-[57px] relative shrink-0 w-[390px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px relative size-full">
        <Container2 />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[32px] relative shrink-0 w-[14.766px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute bg-clip-text font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-0 not-italic text-[24px] text-[transparent] top-0 tracking-[0.0703px] whitespace-nowrap" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(117.979deg, rgb(245, 73, 0) 0%, rgb(225, 113, 0) 100%)" }}>
          T
        </p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-white relative rounded-[16777200px] shadow-[0px_0px_0px_0px_#ffd6a8,0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] shrink-0 size-[64px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Text />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[28px] left-0 overflow-clip top-0 w-[138.156px]" data-name="Heading 2">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#101828] text-[20px] top-0 tracking-[-0.4492px] whitespace-nowrap">TalentFlow Pro</p>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-0">
      <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[20px_20px]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-2.27%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.9091 20.9091">
            <path d={svgPaths.p20609200} fill="url(#paint0_linear_2028_546)" id="Vector" stroke="var(--stroke-0, white)" strokeWidth="0.909091" />
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_2028_546" x1="0.454545" x2="20.4545" y1="10.4545" y2="10.4545">
                <stop stopColor="#9A11F6" />
                <stop offset="1" stopColor="#F34904" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute inset-[38.46%_30.77%_34.62%_30.77%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-6.154px_-7.692px] mask-size-[20px_20px]" data-name="Vector_2" style={{ maskImage: `url('${imgVector}')` }}>
        <div className="absolute inset-[-12.66%_-8.86%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.05594 6.74821">
            <path d={svgPaths.pb18f460} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.36364" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group1 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <ClipPathGroup />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[146.16px] size-[20px] top-[4px]" data-name="Group1000005144">
      <Icon1 />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute h-[28px] left-0 top-0 w-[278px]" data-name="Container">
      <Heading />
      <Group />
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute bg-gradient-to-r from-[#f54900] h-[24px] left-0 rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] to-[#e17100] top-[37.5px] w-[56.102px]" data-name="Text">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-[10px] not-italic text-[12px] text-white top-[5px] whitespace-nowrap">HRMS</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="flex-[1_0_0] h-[61.5px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container8 />
        <Text1 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex gap-[16px] h-[64px] items-start relative shrink-0 w-full" data-name="Container">
      <Container6 />
      <Container7 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Complete HR transformation for modern enterprises</p>
    </div>
  );
}

function Container11() {
  return <div className="absolute left-[69.33px] opacity-10 rounded-[16777200px] size-[64px] top-[-24px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(245, 73, 0) 0%, rgb(225, 113, 0) 100%)" }} />;
}

function Icon2() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[62.5%_33.33%_12.5%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 5.33333">
            <path d={svgPaths.p352c6500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_45.83%_54.17%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66667 6.66667">
            <path d={svgPaths.p31080000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[63.04%_8.33%_12.5%_79.17%]" data-name="Vector">
        <div className="absolute inset-[-17.04%_-33.33%_-17.04%_-33.34%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.3335 5.24683">
            <path d={svgPaths.p234883c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[13.04%_20.8%_54.67%_66.67%]" data-name="Vector">
        <div className="absolute inset-[-12.91%_-33.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.33872 6.50032">
            <path d={svgPaths.pb5d8ae6} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 rounded-[10px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] size-[32px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(245, 73, 0) 0%, rgb(225, 113, 0) 100%)" }}>
      <Container14 />
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute h-[28px] left-0 top-[40px] w-[81.328px]" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-0 tracking-[-0.4395px] whitespace-nowrap">50K+</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute h-[12.5px] left-0 top-[70px] w-[81.328px]" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[12.5px] left-0 not-italic text-[#4a5565] text-[10px] top-[0.5px] tracking-[0.1172px] whitespace-nowrap">Active Users</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute h-[82.5px] left-[14px] top-[14px] w-[81.328px]" data-name="Container">
      <Container13 />
      <Container15 />
      <Container16 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute border border-[rgba(255,214,168,0.5)] border-solid h-[112.5px] left-0 overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[111.328px]" data-name="Container" style={{ backgroundImage: "linear-gradient(134.7deg, rgb(255, 247, 237) 0%, rgb(255, 247, 237) 50%, rgb(255, 251, 235) 100%)" }}>
      <Container11 />
      <Container12 />
    </div>
  );
}

function Container18() {
  return <div className="absolute left-[69.34px] opacity-10 rounded-[16777200px] size-[64px] top-[-24px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(245, 73, 0) 0%, rgb(225, 113, 0) 100%)" }} />;
}

function Icon3() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
            <path d={svgPaths.p3d62dd80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.33%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-5%_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66667 14.6667">
            <path d={svgPaths.p1700eb00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-[8.33%] right-[8.33%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.67px_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 1.33333">
            <path d="M0.666667 0.666667H14" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 rounded-[10px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] size-[32px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(245, 73, 0) 0%, rgb(225, 113, 0) 100%)" }}>
      <Container21 />
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute h-[28px] left-0 top-[40px] w-[81.336px]" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-0 tracking-[-0.4395px] whitespace-nowrap">25+</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute h-[12.5px] left-0 top-[70px] w-[81.336px]" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[12.5px] left-0 not-italic text-[#4a5565] text-[10px] top-[0.5px] tracking-[0.1172px] whitespace-nowrap">Countries</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute h-[82.5px] left-[14px] top-[14px] w-[81.336px]" data-name="Container">
      <Container20 />
      <Container22 />
      <Container23 />
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute border border-[rgba(255,214,168,0.5)] border-solid h-[112.5px] left-[123.33px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[111.336px]" data-name="Container" style={{ backgroundImage: "linear-gradient(134.702deg, rgb(255, 247, 237) 0%, rgb(255, 247, 237) 50%, rgb(255, 251, 235) 100%)" }}>
      <Container18 />
      <Container19 />
    </div>
  );
}

function Container25() {
  return <div className="absolute left-[69.34px] opacity-10 rounded-[16777200px] size-[64px] top-[-24px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(245, 73, 0) 0%, rgb(225, 113, 0) 100%)" }} />;
}

function Icon4() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_16.67%_8.32%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-5%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 14.6689">
            <path d={svgPaths.p8326c00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon4 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 rounded-[10px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)] size-[32px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(245, 73, 0) 0%, rgb(225, 113, 0) 100%)" }}>
      <Container28 />
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute h-[28px] left-0 top-[40px] w-[81.336px]" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-0 tracking-[-0.4395px] whitespace-nowrap">99.9%</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute h-[12.5px] left-0 top-[70px] w-[81.336px]" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[12.5px] left-0 not-italic text-[#4a5565] text-[10px] top-[0.5px] tracking-[0.1172px] whitespace-nowrap">Uptime</p>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute h-[82.5px] left-[14px] top-[14px] w-[81.336px]" data-name="Container">
      <Container27 />
      <Container29 />
      <Container30 />
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute border border-[rgba(255,214,168,0.5)] border-solid h-[112.5px] left-[246.66px] overflow-clip rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[111.336px]" data-name="Container" style={{ backgroundImage: "linear-gradient(134.702deg, rgb(255, 247, 237) 0%, rgb(255, 247, 237) 50%, rgb(255, 251, 235) 100%)" }}>
      <Container25 />
      <Container26 />
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[112.5px] relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Container17 />
      <Container24 />
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-gradient-to-b from-[#fff7ed] h-[277.5px] relative shrink-0 to-[#fffbeb] via-1/2 via-[#fff7ed] w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(255,214,168,0.5)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-px pt-[24px] px-[16px] relative size-full">
        <Container5 />
        <Paragraph />
        <Container9 />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-0 not-italic text-[#101828] text-[16px] top-[-0.5px] tracking-[-0.3125px] whitespace-nowrap">Product Screenshots</p>
    </div>
  );
}

function Container35() {
  return <div className="absolute bg-[#ff6467] left-0 rounded-[16777200px] size-[8px] top-[6px]" data-name="Container" />;
}

function Container36() {
  return <div className="absolute bg-[#fdc700] left-[14px] rounded-[16777200px] size-[8px] top-[6px]" data-name="Container" />;
}

function Container37() {
  return <div className="absolute bg-[#05df72] left-[28px] rounded-[16777200px] size-[8px] top-[6px]" data-name="Container" />;
}

function Container38() {
  return (
    <div className="absolute bg-white content-stretch flex h-[20px] items-center left-[50px] px-[8px] rounded-[4px] top-0 w-[266px]" data-name="Container">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[12px] not-italic relative shrink-0 text-[#99a1af] text-[8px] tracking-[0.2057px] whitespace-nowrap">{`https://talentflowpro.com`}</p>
    </div>
  );
}

function Container34() {
  return (
    <div className="h-[20px] relative shrink-0 w-[324px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container35 />
        <Container36 />
        <Container37 />
        <Container38 />
      </div>
    </div>
  );
}

function Container41() {
  return <div className="bg-[#e5e7eb] h-[12px] rounded-[4px] shrink-0 w-[80px]" data-name="Container" />;
}

function Container42() {
  return <div className="bg-[#e9d4ff] h-[12px] rounded-[4px] shrink-0 w-[48px]" data-name="Container" />;
}

function Container40() {
  return (
    <div className="content-stretch flex h-[12px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container41 />
      <Container42 />
    </div>
  );
}

function Container44() {
  return <div className="absolute h-[32px] left-0 rounded-[4px] top-0 w-[94.664px]" data-name="Container" style={{ backgroundImage: "linear-gradient(161.323deg, rgb(243, 232, 255) 0%, rgb(252, 231, 243) 100%)" }} />;
}

function Container45() {
  return <div className="absolute h-[32px] left-[102.66px] rounded-[4px] top-0 w-[94.664px]" data-name="Container" style={{ backgroundImage: "linear-gradient(161.323deg, rgb(219, 234, 254) 0%, rgb(206, 250, 254) 100%)" }} />;
}

function Container46() {
  return <div className="absolute h-[32px] left-[205.33px] rounded-[4px] top-0 w-[94.664px]" data-name="Container" style={{ backgroundImage: "linear-gradient(161.323deg, rgb(220, 252, 231) 0%, rgb(208, 250, 229) 100%)" }} />;
}

function Container43() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Container">
      <Container44 />
      <Container45 />
      <Container46 />
    </div>
  );
}

function Container48() {
  return <div className="absolute bg-[#e5e7eb] h-[8px] left-0 rounded-[4px] top-0 w-[300px]" data-name="Container" />;
}

function Container49() {
  return <div className="absolute bg-[#e5e7eb] h-[8px] left-0 rounded-[4px] top-[14px] w-[250px]" data-name="Container" />;
}

function Container50() {
  return <div className="absolute bg-[#e5e7eb] h-[8px] left-0 rounded-[4px] top-[28px] w-[200px]" data-name="Container" />;
}

function Container47() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Container">
      <Container48 />
      <Container49 />
      <Container50 />
    </div>
  );
}

function Container39() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[10px] w-[324px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start pt-[12px] px-[12px] relative size-full">
        <Container40 />
        <Container43 />
        <Container47 />
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[192px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[12px] items-start pl-[16px] py-[16px] relative size-full">
        <Container34 />
        <Container39 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[194px] relative rounded-[14px] shrink-0 w-full" data-name="Container" style={{ backgroundImage: "linear-gradient(151.547deg, rgb(249, 250, 251) 0%, rgb(243, 244, 246) 100%)" }}>
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <Container33 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container53() {
  return (
    <div className="h-[12px] relative shrink-0 w-[43.773px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[12px] left-[22px] not-italic text-[#99a1af] text-[8px] text-center top-[0.5px] tracking-[0.2057px] whitespace-nowrap">Dashboard</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="bg-white h-[40px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pr-[0.008px] relative size-full">
          <Container53 />
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[56px] relative rounded-[10px] shrink-0 w-[80px]" data-name="Button" style={{ backgroundImage: "linear-gradient(145.008deg, rgb(249, 250, 251) 0%, rgb(243, 244, 246) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pb-[2px] pt-[8px] px-[8px] relative rounded-[inherit] size-full">
        <Container52 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,214,168,0.5)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_0px_0px_2px_#e9d4ff]" />
    </div>
  );
}

function Container55() {
  return (
    <div className="h-[12px] relative shrink-0 w-[43.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[12px] left-[22px] not-italic text-[#99a1af] text-[8px] text-center top-[0.5px] tracking-[0.2057px] whitespace-nowrap">Employees</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="bg-white content-stretch flex h-[40px] items-center justify-center relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <Container55 />
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[56px] relative rounded-[10px] shrink-0 w-[80px]" data-name="Button" style={{ backgroundImage: "linear-gradient(145.008deg, rgb(249, 250, 251) 0%, rgb(243, 244, 246) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pb-[2px] pt-[8px] px-[8px] relative rounded-[inherit] size-full">
        <Container54 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container57() {
  return (
    <div className="h-[12px] relative shrink-0 w-[37.297px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[12px] left-[19.5px] not-italic text-[#99a1af] text-[8px] text-center top-[0.5px] tracking-[0.2057px] whitespace-nowrap">Analytics</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="bg-white content-stretch flex h-[40px] items-center justify-center relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <Container57 />
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[56px] relative rounded-[10px] shrink-0 w-[80px]" data-name="Button" style={{ backgroundImage: "linear-gradient(145.008deg, rgb(249, 250, 251) 0%, rgb(243, 244, 246) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pb-[2px] pt-[8px] px-[8px] relative rounded-[inherit] size-full">
        <Container56 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container59() {
  return (
    <div className="h-[12px] relative shrink-0 w-[33.727px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[12px] left-[17px] not-italic text-[#99a1af] text-[8px] text-center top-[0.5px] tracking-[0.2057px] whitespace-nowrap">Settings</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="bg-white h-[40px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pr-[0.008px] relative size-full">
          <Container59 />
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="h-[56px] relative rounded-[10px] shrink-0 w-[80px]" data-name="Button" style={{ backgroundImage: "linear-gradient(145.008deg, rgb(249, 250, 251) 0%, rgb(243, 244, 246) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pb-[2px] pt-[8px] px-[8px] relative rounded-[inherit] size-full">
        <Container58 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex gap-[8px] h-[60px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[343px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[12px] items-start pb-px pt-[20px] px-[16px] relative size-full">
        <Heading1 />
        <Container32 />
        <Container51 />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="absolute h-[24px] left-[16px] top-[20px] w-[358px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-0 not-italic text-[#101828] text-[16px] top-[-0.5px] tracking-[-0.3125px] whitespace-nowrap">About TalentFlow Pro</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[136.5px] left-[16px] top-[56px] w-[358px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-0 not-italic text-[#4a5565] text-[14px] top-px tracking-[-0.1504px] w-[356px]">TalentFlow Pro is an enterprise-grade HRMS platform that streamlines every aspect of human resource management. From onboarding to offboarding, we help organizations build better workplaces through intelligent automation, data-driven insights, and seamless integrations.</p>
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-0 size-[20px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_2028_541)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p17212180} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M1.66667 10H18.3333" id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_2028_541">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[16px] left-0 top-0 w-[167.25px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] top-px whitespace-nowrap">Website</p>
    </div>
  );
}

function Container62() {
  return (
    <div className="absolute h-[42px] left-[32px] top-0 w-[167.25px]" data-name="Container">
      <Paragraph2 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#9810fa] text-[14px] top-[19.5px] tracking-[-0.1504px] whitespace-nowrap">{`https://talentflowpro.com`}</p>
    </div>
  );
}

function Container61() {
  return (
    <div className="absolute h-[42px] left-[16px] top-[208.5px] w-[358px]" data-name="Container">
      <Icon5 />
      <Container62 />
    </div>
  );
}

function Container60() {
  return (
    <div className="h-[271.5px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Heading2 />
      <Paragraph1 />
      <Container61 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-0 size-[20px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p3a2fa580} id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 3">
      <Icon6 />
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-[28px] not-italic text-[#101828] text-[16px] top-[-0.5px] tracking-[-0.3125px] whitespace-nowrap">Key Features</p>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_2028_501)" id="Icon">
          <path d={svgPaths.p34e03900} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1f2c5400} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_2028_501">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[192.625px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Automated Payroll Processing</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="col-1 content-stretch flex gap-[8px] items-center justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Icon7 />
      <Text2 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_2028_501)" id="Icon">
          <path d={svgPaths.p34e03900} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1f2c5400} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_2028_501">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[171.281px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Performance Management</p>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="col-1 content-stretch flex gap-[8px] items-center justify-self-stretch relative row-2 self-stretch shrink-0" data-name="Container">
      <Icon8 />
      <Text3 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_2028_501)" id="Icon">
          <path d={svgPaths.p34e03900} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1f2c5400} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_2028_501">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[182.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">{`Time & Attendance Tracking`}</p>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="col-1 content-stretch flex gap-[8px] items-center justify-self-stretch relative row-3 self-stretch shrink-0" data-name="Container">
      <Icon9 />
      <Text4 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_2028_501)" id="Icon">
          <path d={svgPaths.p34e03900} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1f2c5400} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_2028_501">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[149.93px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Benefits Administration</p>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="col-1 content-stretch flex gap-[8px] items-center justify-self-stretch relative row-4 self-stretch shrink-0" data-name="Container">
      <Icon10 />
      <Text5 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_2028_501)" id="Icon">
          <path d={svgPaths.p34e03900} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1f2c5400} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_2028_501">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[164.344px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Compliance Management</p>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="col-1 content-stretch flex gap-[8px] items-center justify-self-stretch relative row-5 self-stretch shrink-0" data-name="Container">
      <Icon11 />
      <Text6 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_2028_501)" id="Icon">
          <path d={svgPaths.p34e03900} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1f2c5400} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_2028_501">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[20px] relative shrink-0 w-[207.172px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">{`Advanced Analytics & Reporting`}</p>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="col-1 content-stretch flex gap-[8px] items-center justify-self-stretch relative row-6 self-stretch shrink-0" data-name="Container">
      <Icon12 />
      <Text7 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_2028_501)" id="Icon">
          <path d={svgPaths.p34e03900} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1f2c5400} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_2028_501">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[177.961px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">{`Mobile App (iOS & Android)`}</p>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="col-1 content-stretch flex gap-[8px] items-center justify-self-stretch relative row-7 self-stretch shrink-0" data-name="Container">
      <Icon13 />
      <Text8 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_2028_501)" id="Icon">
          <path d={svgPaths.p34e03900} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1f2c5400} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_2028_501">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[20px] relative shrink-0 w-[102.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">API Integrations</p>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="col-1 content-stretch flex gap-[8px] items-center justify-self-stretch relative row-8 self-stretch shrink-0" data-name="Container">
      <Icon14 />
      <Text9 />
    </div>
  );
}

function Container64() {
  return (
    <div className="gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[repeat(8,minmax(0,1fr))] h-[216px] relative shrink-0 w-full" data-name="Container">
      <Container65 />
      <Container66 />
      <Container67 />
      <Container68 />
      <Container69 />
      <Container70 />
      <Container71 />
      <Container72 />
    </div>
  );
}

function Container63() {
  return (
    <div className="h-[293px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[12px] items-start pb-px pt-[20px] px-[16px] relative size-full">
        <Heading3 />
        <Container64 />
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="absolute left-0 size-[20px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p140c1100} id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M15 14.1667V7.5" id="Vector_2" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10.8333 14.1667V4.16667" id="Vector_3" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M6.66667 14.1667V11.6667" id="Vector_4" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Heading4() {
  return (
    <div className="absolute h-[24px] left-[16px] top-[20px] w-[358px]" data-name="Heading 3">
      <Icon15 />
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-[28px] not-italic text-[#101828] text-[16px] top-[-0.5px] tracking-[-0.3125px] whitespace-nowrap">Pricing Plans</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute h-[16px] left-[16px] top-[48px] w-[358px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] top-px whitespace-nowrap">Per Employee/Month</p>
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#101828] text-[16px] top-[-0.5px] tracking-[-0.3125px] whitespace-nowrap">Starter</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute bg-clip-text font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[18px] text-[transparent] top-0 tracking-[-0.4395px] whitespace-nowrap" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, rgb(152, 16, 250) 0%, rgb(255, 105, 0) 100%)" }}>
        $8
      </p>
    </div>
  );
}

function Container77() {
  return (
    <div className="h-[52px] relative shrink-0 w-[53.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading5 />
        <Paragraph4 />
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="h-[52px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pr-[278.773px] relative size-full">
          <Container77 />
        </div>
      </div>
    </div>
  );
}

function Icon16() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2028_509)" id="Icon">
          <path d={svgPaths.p23551518} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 5.5L6 7L11 2" id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2028_509">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ListItem() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="List Item">
      <Icon16 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[20px] not-italic text-[#4a5565] text-[12px] top-px whitespace-nowrap">Up to 50 employees</p>
    </div>
  );
}

function Icon17() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2028_509)" id="Icon">
          <path d={svgPaths.p23551518} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 5.5L6 7L11 2" id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2028_509">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ListItem1() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="List Item">
      <Icon17 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[20px] not-italic text-[#4a5565] text-[12px] top-px whitespace-nowrap">Core HR features</p>
    </div>
  );
}

function Icon18() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2028_509)" id="Icon">
          <path d={svgPaths.p23551518} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 5.5L6 7L11 2" id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2028_509">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ListItem2() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="List Item">
      <Icon18 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[20px] not-italic text-[#4a5565] text-[12px] top-px whitespace-nowrap">Email support</p>
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[56px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem />
      <ListItem1 />
      <ListItem2 />
    </div>
  );
}

function Container75() {
  return (
    <div className="bg-white h-[142px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start pb-px pt-[13px] px-[13px] relative size-full">
        <Container76 />
        <List />
      </div>
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#101828] text-[16px] top-[-0.5px] tracking-[-0.3125px] whitespace-nowrap">Growth</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute bg-clip-text font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[18px] text-[transparent] top-0 tracking-[-0.4395px] whitespace-nowrap" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, rgb(152, 16, 250) 0%, rgb(255, 105, 0) 100%)" }}>
        $15
      </p>
    </div>
  );
}

function Container80() {
  return (
    <div className="h-[52px] relative shrink-0 w-[55.484px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading6 />
        <Paragraph5 />
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="bg-gradient-to-r from-[#f54900] h-[24px] relative rounded-[16777200px] shrink-0 to-[#e17100] w-[74.992px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-[8px] not-italic text-[12px] text-white top-[5px] whitespace-nowrap">POPULAR</p>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="content-stretch flex h-[52px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container80 />
      <Text10 />
    </div>
  );
}

function Icon19() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2028_509)" id="Icon">
          <path d={svgPaths.p23551518} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 5.5L6 7L11 2" id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2028_509">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ListItem3() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="List Item">
      <Icon19 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[20px] not-italic text-[#4a5565] text-[12px] top-px whitespace-nowrap">Up to 200 employees</p>
    </div>
  );
}

function Icon20() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2028_509)" id="Icon">
          <path d={svgPaths.p23551518} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 5.5L6 7L11 2" id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2028_509">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ListItem4() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="List Item">
      <Icon20 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[20px] not-italic text-[#4a5565] text-[12px] top-px whitespace-nowrap">All Starter features</p>
    </div>
  );
}

function Icon21() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2028_509)" id="Icon">
          <path d={svgPaths.p23551518} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 5.5L6 7L11 2" id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2028_509">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ListItem5() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="List Item">
      <Icon21 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[20px] not-italic text-[#4a5565] text-[12px] top-px whitespace-nowrap">Performance management</p>
    </div>
  );
}

function Icon22() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2028_509)" id="Icon">
          <path d={svgPaths.p23551518} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 5.5L6 7L11 2" id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2028_509">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ListItem6() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="List Item">
      <Icon22 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[20px] not-italic text-[#4a5565] text-[12px] top-px whitespace-nowrap">Priority support</p>
    </div>
  );
}

function List1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[76px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem3 />
      <ListItem4 />
      <ListItem5 />
      <ListItem6 />
    </div>
  );
}

function Container78() {
  return (
    <div className="bg-gradient-to-b from-[#fff7ed] h-[162px] relative rounded-[14px] shrink-0 to-[#fffbeb] via-1/2 via-[#fff7ed] w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(255,214,168,0.5)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start pb-px pt-[13px] px-[13px] relative size-full">
        <Container79 />
        <List1 />
      </div>
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#101828] text-[16px] top-[-0.5px] tracking-[-0.3125px] whitespace-nowrap">Enterprise</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute bg-clip-text font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[18px] text-[transparent] top-0 tracking-[-0.4395px] whitespace-nowrap" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, rgb(152, 16, 250) 0%, rgb(255, 105, 0) 100%)" }}>
        Custom
      </p>
    </div>
  );
}

function Container83() {
  return (
    <div className="h-[52px] relative shrink-0 w-[78.484px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading7 />
        <Paragraph6 />
      </div>
    </div>
  );
}

function Container82() {
  return (
    <div className="h-[52px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pr-[253.516px] relative size-full">
          <Container83 />
        </div>
      </div>
    </div>
  );
}

function Icon23() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2028_509)" id="Icon">
          <path d={svgPaths.p23551518} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 5.5L6 7L11 2" id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2028_509">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ListItem7() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="List Item">
      <Icon23 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[20px] not-italic text-[#4a5565] text-[12px] top-px whitespace-nowrap">Unlimited employees</p>
    </div>
  );
}

function Icon24() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2028_509)" id="Icon">
          <path d={svgPaths.p23551518} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 5.5L6 7L11 2" id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2028_509">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ListItem8() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="List Item">
      <Icon24 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[20px] not-italic text-[#4a5565] text-[12px] top-px whitespace-nowrap">All Growth features</p>
    </div>
  );
}

function Icon25() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2028_509)" id="Icon">
          <path d={svgPaths.p23551518} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 5.5L6 7L11 2" id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2028_509">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ListItem9() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="List Item">
      <Icon25 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[20px] not-italic text-[#4a5565] text-[12px] top-px whitespace-nowrap">Custom integrations</p>
    </div>
  );
}

function Icon26() {
  return (
    <div className="absolute left-0 size-[12px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2028_509)" id="Icon">
          <path d={svgPaths.p23551518} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 5.5L6 7L11 2" id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2028_509">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ListItem10() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="List Item">
      <Icon26 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[20px] not-italic text-[#4a5565] text-[12px] top-px whitespace-nowrap">Dedicated account manager</p>
    </div>
  );
}

function List2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[76px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem7 />
      <ListItem8 />
      <ListItem9 />
      <ListItem10 />
    </div>
  );
}

function Container81() {
  return (
    <div className="bg-white h-[162px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start pb-px pt-[13px] px-[13px] relative size-full">
        <Container82 />
        <List2 />
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[490px] items-start left-[16px] top-[76px] w-[358px]" data-name="Container">
      <Container75 />
      <Container78 />
      <Container81 />
    </div>
  );
}

function Container73() {
  return (
    <div className="h-[587px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Heading4 />
      <Paragraph3 />
      <Container74 />
    </div>
  );
}

function Icon27() {
  return (
    <div className="absolute left-0 size-[20px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p164f7540} id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p809b580} id="Vector_2" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Heading8() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 3">
      <Icon27 />
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-[28px] not-italic text-[#101828] text-[16px] top-[-0.5px] tracking-[-0.3125px] whitespace-nowrap">Ideal For</p>
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute bg-[#f3e8ff] content-stretch flex h-[30px] items-center left-0 px-[13px] py-[7px] rounded-[16777200px] top-0 w-[141.906px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[#e9d4ff] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#8200db] text-[12px] whitespace-nowrap">Mid-size companies</p>
    </div>
  );
}

function Text12() {
  return (
    <div className="absolute bg-[#f3e8ff] content-stretch flex h-[30px] items-center left-[149.91px] px-[13px] py-[7px] rounded-[16777200px] top-0 w-[167.094px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[#e9d4ff] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#8200db] text-[12px] whitespace-nowrap">Enterprise organizations</p>
    </div>
  );
}

function Text13() {
  return (
    <div className="absolute bg-[#f3e8ff] content-stretch flex h-[30px] items-center left-0 px-[13px] py-[7px] rounded-[16777200px] top-[38px] w-[174.383px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[#e9d4ff] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#8200db] text-[12px] whitespace-nowrap">Multi-location businesses</p>
    </div>
  );
}

function Text14() {
  return (
    <div className="absolute bg-[#f3e8ff] content-stretch flex h-[30px] items-center left-[182.38px] px-[13px] py-[7px] rounded-[16777200px] top-[38px] w-[108.797px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[#e9d4ff] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#8200db] text-[12px] whitespace-nowrap">Remote teams</p>
    </div>
  );
}

function Text15() {
  return (
    <div className="absolute bg-[#f3e8ff] content-stretch flex h-[30px] items-center left-0 px-[13px] py-[7px] rounded-[16777200px] top-[76px] w-[119.953px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[#e9d4ff] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#8200db] text-[12px] whitespace-nowrap">Scaling startups</p>
    </div>
  );
}

function Container85() {
  return (
    <div className="h-[106px] relative shrink-0 w-full" data-name="Container">
      <Text11 />
      <Text12 />
      <Text13 />
      <Text14 />
      <Text15 />
    </div>
  );
}

function Container84() {
  return (
    <div className="h-[183px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[12px] items-start pb-px pt-[20px] px-[16px] relative size-full">
        <Heading8 />
        <Container85 />
      </div>
    </div>
  );
}

function Heading9() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-0 not-italic text-[#101828] text-[16px] top-[-0.5px] tracking-[-0.3125px] whitespace-nowrap">Company Information</p>
    </div>
  );
}

function Icon28() {
  return (
    <div className="absolute left-0 size-[20px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p26ddc800} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p35ba4680} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] top-px whitespace-nowrap">Location</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#101828] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">San Francisco, CA</p>
    </div>
  );
}

function Container89() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[38px] items-start left-[32px] top-0 w-[119.688px]" data-name="Container">
      <Paragraph7 />
      <Paragraph8 />
    </div>
  );
}

function Container88() {
  return (
    <div className="h-[38px] relative shrink-0 w-full" data-name="Container">
      <Icon28 />
      <Container89 />
    </div>
  );
}

function Icon29() {
  return (
    <div className="absolute left-0 size-[20px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M6.66667 1.66667V5" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 1.66667V5" id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1da67b80} id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M2.5 8.33333H17.5" id="Vector_4" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] top-px whitespace-nowrap">Founded</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#101828] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">2018</p>
    </div>
  );
}

function Container91() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[38px] items-start left-[32px] top-0 w-[49.563px]" data-name="Container">
      <Paragraph9 />
      <Paragraph10 />
    </div>
  );
}

function Container90() {
  return (
    <div className="h-[38px] relative shrink-0 w-full" data-name="Container">
      <Icon29 />
      <Container91 />
    </div>
  );
}

function Icon30() {
  return (
    <div className="absolute left-0 size-[20px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p25397b80} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2c4f400} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2241fff0} id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.pae3c380} id="Vector_4" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] top-px whitespace-nowrap">Team Size</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#101828] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">150-200</p>
    </div>
  );
}

function Container93() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[38px] items-start left-[32px] top-0 w-[57.492px]" data-name="Container">
      <Paragraph11 />
      <Paragraph12 />
    </div>
  );
}

function Container92() {
  return (
    <div className="h-[38px] relative shrink-0 w-full" data-name="Container">
      <Icon30 />
      <Container93 />
    </div>
  );
}

function Icon31() {
  return (
    <div className="absolute left-0 size-[20px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p3c797180} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3ac0b600} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] top-px whitespace-nowrap">Active Clients</p>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#101828] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">2,500+</p>
    </div>
  );
}

function Container95() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[38px] items-start left-[32px] top-0 w-[77.367px]" data-name="Container">
      <Paragraph13 />
      <Paragraph14 />
    </div>
  );
}

function Container94() {
  return (
    <div className="h-[38px] relative shrink-0 w-full" data-name="Container">
      <Icon31 />
      <Container95 />
    </div>
  );
}

function Icon32() {
  return (
    <div className="absolute left-0 size-[20px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_2028_541)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p17212180} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M1.66667 10H18.3333" id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_2028_541">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="absolute h-[16px] left-0 top-0 w-[167.25px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] top-px whitespace-nowrap">Website</p>
    </div>
  );
}

function Container97() {
  return (
    <div className="absolute h-[42px] left-[32px] top-0 w-[167.25px]" data-name="Container">
      <Paragraph15 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#9810fa] text-[14px] top-[19.5px] tracking-[-0.1504px] whitespace-nowrap">{`https://talentflowpro.com`}</p>
    </div>
  );
}

function Container96() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Container">
      <Icon32 />
      <Container97 />
    </div>
  );
}

function Container87() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[242px] items-start relative shrink-0 w-full" data-name="Container">
      <Container88 />
      <Container90 />
      <Container92 />
      <Container94 />
      <Container96 />
    </div>
  );
}

function Container86() {
  return (
    <div className="h-[330px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[12px] items-start pt-[20px] px-[16px] relative size-full">
        <Heading9 />
        <Container87 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[390px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Container4 />
        <Container31 />
        <Container60 />
        <Container63 />
        <Container73 />
        <Container84 />
        <Container86 />
      </div>
    </div>
  );
}

function VendorDetailScreen() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[813px] items-start left-0 top-0 w-[390px]" data-name="VendorDetailScreen">
      <Container1 />
      <Container3 />
    </div>
  );
}

function VendorDetailScreen1() {
  return (
    <div className="absolute h-[28px] left-[132.19px] top-[14px] w-[125.617px]" data-name="VendorDetailScreen">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-0 tracking-[-0.4395px] whitespace-nowrap">Vendor Details</p>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-white h-[844px] left-[340.5px] overflow-clip shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] top-0 w-[390px]" data-name="Container">
      <VendorDetailScreen />
      <VendorDetailScreen1 />
    </div>
  );
}

function MobileViewport() {
  return (
    <div className="bg-[#f5f5f5] h-[844px] relative shrink-0 w-full" data-name="MobileViewport">
      <Container />
    </div>
  );
}

function Body() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[813px] items-start left-0 top-0 w-[1071px]" data-name="Body">
      <MobileViewport />
    </div>
  );
}

function Icon33() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2338cf00} id="Vector" stroke="var(--stroke-0, #751FA0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p28db2b80} id="Vector_2" stroke="var(--stroke-0, #751FA0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text16() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#040404] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Demo</p>
      </div>
    </div>
  );
}

function Container99() {
  return (
    <div className="h-[20px] relative shrink-0 w-[63.336px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon33 />
        <Text16 />
      </div>
    </div>
  );
}

function Icon34() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
            <path d={svgPaths.p48af40} id="Vector" stroke="var(--stroke-0, #717171)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
            <path d={svgPaths.p30908200} id="Vector" stroke="var(--stroke-0, #717171)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="relative shrink-0 size-[44px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[4px] pr-[24px] pt-[14px] relative size-full">
        <Icon34 />
      </div>
    </div>
  );
}

function DemoControls() {
  return (
    <div className="bg-[#f8f8f8] h-[69px] relative shrink-0 w-full" data-name="DemoControls">
      <div aria-hidden="true" className="absolute border-[#eaeaea] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-px px-[16px] relative size-full">
          <Container99 />
          <Button5 />
        </div>
      </div>
    </div>
  );
}

function Container101() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#717171] text-[12px] top-px uppercase whitespace-nowrap">Jump to Screen</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="h-[44px] relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[12px] not-italic text-[#717171] text-[14px] top-[12.5px] tracking-[-0.1504px] whitespace-nowrap">Splash</p>
    </div>
  );
}

function Button7() {
  return (
    <div className="h-[44px] relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[12px] not-italic text-[#717171] text-[14px] top-[12.5px] tracking-[-0.1504px] whitespace-nowrap">Value Intro</p>
    </div>
  );
}

function Button8() {
  return (
    <div className="h-[44px] relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[12px] not-italic text-[#717171] text-[14px] top-[12.5px] tracking-[-0.1504px] whitespace-nowrap">Role Selection</p>
    </div>
  );
}

function Button9() {
  return (
    <div className="h-[44px] relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[12px] not-italic text-[#717171] text-[14px] top-[12.5px] tracking-[-0.1504px] whitespace-nowrap">Vendor Auth</p>
    </div>
  );
}

function Button10() {
  return (
    <div className="h-[44px] relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[12px] not-italic text-[#717171] text-[14px] top-[12.5px] tracking-[-0.1504px] whitespace-nowrap">OTP Verification</p>
    </div>
  );
}

function Button11() {
  return (
    <div className="h-[44px] relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[12px] not-italic text-[#717171] text-[14px] top-[12.5px] tracking-[-0.1504px] whitespace-nowrap">Vendor Welcome</p>
    </div>
  );
}

function Button12() {
  return (
    <div className="h-[56px] relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[12px] not-italic text-[#717171] text-[14px] top-[8.5px] tracking-[-0.1504px] w-[180px]">Vendor Onboarding (All-in-One)</p>
    </div>
  );
}

function Button13() {
  return (
    <div className="h-[44px] relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[12px] not-italic text-[#717171] text-[14px] top-[12.5px] tracking-[-0.1504px] whitespace-nowrap">Home - Focus</p>
    </div>
  );
}

function Button14() {
  return (
    <div className="h-[44px] relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[12px] not-italic text-[#717171] text-[14px] top-[12.5px] tracking-[-0.1504px] whitespace-nowrap">Marketplace</p>
    </div>
  );
}

function Icon35() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_2028_482)" id="Icon">
          <path d={svgPaths.p36f21e80} id="Vector" stroke="var(--stroke-0, #751FA0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2a594880} id="Vector_2" stroke="var(--stroke-0, #751FA0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p20b4ecc0} id="Vector_3" stroke="var(--stroke-0, #751FA0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M1.33333 4.66667H14.6667" id="Vector_4" stroke="var(--stroke-0, #751FA0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p4cbcae0} id="Vector_5" stroke="var(--stroke-0, #751FA0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_2028_482">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text17() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[45.5px] not-italic text-[#040404] text-[14px] text-center top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Vendor Detail</p>
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="h-[20px] relative shrink-0 w-[113.078px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon35 />
        <Text17 />
      </div>
    </div>
  );
}

function Icon36() {
  return (
    <div className="relative size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #717171)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button15() {
  return (
    <div className="bg-[#f5f5f5] h-[44px] relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] relative size-full">
          <Container104 />
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <Icon36 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DemoControls2() {
  return (
    <div className="bg-[#f8eaff] h-[44px] relative rounded-[4px] shrink-0 w-full" data-name="DemoControls">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[12px] not-italic text-[#751fa0] text-[14px] top-[12.5px] tracking-[-0.1504px] whitespace-nowrap">Subscribed</p>
    </div>
  );
}

function DemoControls3() {
  return (
    <div className="h-[44px] relative rounded-[4px] shrink-0 w-full" data-name="DemoControls">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[12px] not-italic text-[#717171] text-[14px] top-[12.5px] tracking-[-0.1504px] whitespace-nowrap">Unsubscribed (Owner)</p>
    </div>
  );
}

function DemoControls4() {
  return (
    <div className="h-[44px] relative rounded-[4px] shrink-0 w-full" data-name="DemoControls">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[12px] not-italic text-[#717171] text-[14px] top-[12.5px] tracking-[-0.1504px] whitespace-nowrap">Unsubscribed (Public)</p>
    </div>
  );
}

function Container105() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[140px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <DemoControls2 />
      <DemoControls3 />
      <DemoControls4 />
    </div>
  );
}

function Container103() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[188px] items-start relative shrink-0 w-full" data-name="Container">
      <Button15 />
      <Container105 />
    </div>
  );
}

function Button16() {
  return (
    <div className="h-[44px] relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[12px] not-italic text-[#717171] text-[14px] top-[12.5px] tracking-[-0.1504px] whitespace-nowrap">Chat - TalentFlow Pro</p>
    </div>
  );
}

function Button17() {
  return (
    <div className="h-[44px] relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[12px] not-italic text-[#717171] text-[14px] top-[12.5px] tracking-[-0.1504px] whitespace-nowrap">My Listings - Empty State</p>
    </div>
  );
}

function Button18() {
  return (
    <div className="h-[44px] relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[12px] not-italic text-[#717171] text-[14px] top-[12.5px] tracking-[-0.1504px] whitespace-nowrap">Create/Edit Listing - Form</p>
    </div>
  );
}

function Button19() {
  return (
    <div className="h-[44px] relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[12px] not-italic text-[#717171] text-[14px] top-[12.5px] tracking-[-0.1504px] whitespace-nowrap">Parley Home - Messages Tab</p>
    </div>
  );
}

function Button20() {
  return (
    <div className="h-[44px] relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[12px] not-italic text-[#717171] text-[14px] top-[12.5px] tracking-[-0.1504px] whitespace-nowrap">Parley Home - Profile Tab</p>
    </div>
  );
}

function Button21() {
  return (
    <div className="h-[56px] relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[12px] not-italic text-[#717171] text-[14px] top-[8.5px] tracking-[-0.1504px] w-[178px]">Parley Home - Profile (Rich Data)</p>
    </div>
  );
}

function Container102() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[932px] items-start relative shrink-0 w-full" data-name="Container">
      <Button6 />
      <Button7 />
      <Button8 />
      <Button9 />
      <Button10 />
      <Button11 />
      <Button12 />
      <Button13 />
      <Button14 />
      <Container103 />
      <Button16 />
      <Button17 />
      <Button18 />
      <Button19 />
      <Button20 />
      <Button21 />
    </div>
  );
}

function Container100() {
  return (
    <div className="h-[993px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#eaeaea] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[12px] items-start pb-px pt-[16px] px-[16px] relative size-full">
        <Container101 />
        <Container102 />
      </div>
    </div>
  );
}

function Container107() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#717171] text-[12px] top-px uppercase whitespace-nowrap">Role Mode</p>
    </div>
  );
}

function RadioButton() {
  return <div className="shrink-0 size-[16px]" data-name="Radio Button" />;
}

function Text18() {
  return (
    <div className="h-[20px] relative shrink-0 w-[109.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#040404] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Vendor (Locked)</p>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex gap-[8px] h-[44px] items-center relative shrink-0 w-full" data-name="Label">
      <RadioButton />
      <Text18 />
    </div>
  );
}

function Container106() {
  return (
    <div className="h-[101px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#eaeaea] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[8px] items-start pb-px pt-[16px] px-[16px] relative size-full">
        <Container107 />
        <Label />
      </div>
    </div>
  );
}

function Container109() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#717171] text-[12px] top-px uppercase whitespace-nowrap">Profile Analytics</p>
    </div>
  );
}

function Checkbox() {
  return <div className="shrink-0 size-[16px]" data-name="Checkbox" />;
}

function Text19() {
  return (
    <div className="h-[20px] relative shrink-0 w-[158.719px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#040404] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Has Marketplace Listing</p>
      </div>
    </div>
  );
}

function Label1() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[44px] items-center left-0 top-0 w-[222px]" data-name="Label">
      <Checkbox />
      <Text19 />
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="absolute h-[32px] left-[24px] top-[52px] w-[198px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717171] text-[12px] top-px w-[194px]">Shows segmented analytics with Overview/Profile/Marketplace tabs</p>
    </div>
  );
}

function Container110() {
  return (
    <div className="h-[84px] relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <Paragraph16 />
    </div>
  );
}

function Container108() {
  return (
    <div className="h-[141px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#eaeaea] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[8px] items-start pb-px pt-[16px] px-[16px] relative size-full">
        <Container109 />
        <Container110 />
      </div>
    </div>
  );
}

function DemoControls1() {
  return (
    <div className="content-stretch flex flex-col h-[591.695px] items-start overflow-clip relative shrink-0 w-full" data-name="DemoControls">
      <Container100 />
      <Container106 />
      <Container108 />
    </div>
  );
}

function Icon37() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M10 12L6 8L10 4" id="Vector" stroke="var(--stroke-0, #040404)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text20() {
  return (
    <div className="h-[20px] relative shrink-0 w-[56.969px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[28.5px] not-italic text-[#040404] text-[14px] text-center top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Previous</p>
      </div>
    </div>
  );
}

function Button22() {
  return (
    <div className="bg-white flex-[1_0_0] h-[44px] min-h-px min-w-px relative rounded-[4px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#eaeaea] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center justify-center p-px relative size-full">
        <Icon37 />
        <Text20 />
      </div>
    </div>
  );
}

function Text21() {
  return (
    <div className="h-[20px] relative shrink-0 w-[30.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[15.5px] not-italic text-[#040404] text-[14px] text-center top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">Next</p>
      </div>
    </div>
  );
}

function Icon38() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #040404)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button23() {
  return (
    <div className="bg-white flex-[1_0_0] h-[44px] min-h-px min-w-px relative rounded-[4px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#eaeaea] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center justify-center p-px relative size-full">
        <Text21 />
        <Icon38 />
      </div>
    </div>
  );
}

function DemoControls5() {
  return (
    <div className="bg-[#f8f8f8] h-[69px] relative shrink-0 w-full" data-name="DemoControls">
      <div aria-hidden="true" className="absolute border-[#eaeaea] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pt-px px-[16px] relative size-full">
          <Button22 />
          <Button23 />
        </div>
      </div>
    </div>
  );
}

function Container98() {
  return (
    <div className="absolute bg-white h-[731.695px] left-[24px] rounded-[14px] top-[31px] w-[256px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <DemoControls />
        <DemoControls1 />
        <DemoControls5 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#eaeaea] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]" />
    </div>
  );
}

export default function Component4ServiceVendorEntryFlow() {
  return (
    <div className="bg-white relative size-full" data-name="4. Service Vendor Entry Flow">
      <Body />
      <Container98 />
    </div>
  );
}