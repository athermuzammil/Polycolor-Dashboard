import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input1";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Filter from "@/public/icon/filter";
import { useCurrentLocale, useI18n } from "@/locales/client";
import { Shad } from "./shad";

export function PopoverDemo({ options, setoptions, tog, settog, setquotes, allquotes }) {

  const t = useI18n();
  const currentLocale = useCurrentLocale();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={`flex ${currentLocale == "en" ? "w-[110px]" : "w-[110px]"
          } gap-4 items-center border border-[#E5EAEF] rounded-[53px] px-6 py-4 h-[50px] relative  `}
        >

          <Filter />
          <div className="text-[#16191D] font-Matter font-medium text-[0.875rem]">
          {t("p208")}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48">
        <Shad options={options} setoptions={setoptions} tog={tog} settog={settog} setquotes={setquotes} allquotes={allquotes} accepted={t("p210")}  rejected={t("p211")} created={t("p24")} pending={t("p42")} />
      </PopoverContent>
    </Popover>
  );
}
