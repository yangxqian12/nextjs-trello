"use client"

import { useRouter, usePathname } from "next/navigation" // 不要用 next/router
import Image from "next/image"
import {
    Activity,
    CreditCard,
    Layout,
    Settings
} from "lucide-react" // icons

import { cn } from "@/lib/utils"
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

// 对外
export type Organization = {
    id: string;
    slug: string
    imageUrl: string
    name: string
}

interface NavItemProps {
    isExpanded: boolean;
    isActive: boolean;
    organization: Organization;
    onExpand: (id: string) => void
}

export const NavItem = ({
    isExpanded,
    isActive,
    organization,
    onExpand
}: NavItemProps) => {
    const router = useRouter()
    const pathname = usePathname()

    const routes = [
        {
            label: "Boards",
            icon: <Layout className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}`
        },
        {
            label: "Activity",
            icon: <Activity className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}/activity`
        },
        {
            label: "Settings",
            icon: <Settings className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}/settings`
        },
        {
            label: "Billling",
            icon: <CreditCard className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}/billling`
        },
    ]

    // 地址切换
    const onClick = (href: string) => {
        router.push(href)
    }

    return (
        <AccordionItem
            value={organization.id}
        // className="border-none" // todo
        >
            <AccordionTrigger
                onClick={() => onExpand(organization.id)}
                className={cn( // cn动态绑定样式合理覆盖
                    "flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
                    isActive && !isExpanded && "bg-sky-500/10 text-sky-700" // 对的，激活且合起时暂时蓝色背景，激活且展开时默认背景
                )}
            >
                <div className="flex items-center gap-x-2">
                    <div className=" w-7 h-7 relative">
                        <Image
                            fill
                            src={organization.imageUrl} // url需要配置todo
                            alt="organization"
                            className=" rounded-sm object-cover"
                        />
                    </div>
                    <span className=" font-medium text-sm">
                        {organization.name}
                    </span>
                </div>

            </AccordionTrigger>
            <AccordionContent
                className="pt-1 text-neutral-700"
            >
                {routes.map((route) => (
                    <Button
                        key={route.href}
                        size="sm"
                        onClick={() => onClick(route.href)}
                        className={cn(
                            "w-full font-normal justify-start pl-10 mb-1",
                            pathname === route.href && "bg-sky-500/10 text-sky-700"
                        )}
                        variant="ghost"
                    >
                        {route.icon}
                        {route.label}
                    </Button>
                ))}
            </AccordionContent>
        </AccordionItem>
    )
}

// 骨架屏
NavItem.Skeleton = function SkeletonNavItem() {
    return (
        <div className="flex items-center gap-x-2">
            <div className="w-10 h-10 relative shrink-0">
                <Skeleton className="h-full w-full absolute" />
            </div>
            <Skeleton className="h-10 w-full" />
        </div>
    )
}