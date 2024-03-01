import { Divider, Tab, Tabs } from "@nextui-org/react";
import { ProjectLogo } from "#/components";
import { ComputerDesktopIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { useMounted } from "#/utils";

export function MyFooter() {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();

  return (
    <footer className="container space-y-6 py-12">
      <Divider />

      <ProjectLogo size={80} />

      <div className="flex flex-wrap items-end justify-between gap-x-36 gap-y-6 text-default-500 [&_*]:text-sm">
        <p>Copyright @ 2024 Enigma Team. All Rights Reserved.</p>
        {mounted && (
          <Tabs
            size="sm"
            radius="full"
            variant="bordered"
            color="primary"
            classNames={{ tab: "w-7" }}
            selectedKey={theme}
            // @ts-ignore
            onSelectionChange={setTheme}
          >
            <Tab key="light" title={<SunIcon className="h-4 w-4" />} />
            <Tab key="system" title={<ComputerDesktopIcon className="h-4 w-4" />} />
            <Tab key="dark" title={<MoonIcon className="h-4 w-4" />} />
          </Tabs>
        )}
      </div>
    </footer>
  );
}
