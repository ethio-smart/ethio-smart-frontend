'use client';

import React from 'react';
import {
  AlertCircle,
  AlertTriangle,
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ArrowUp,
  ArrowDown,
  Bookmark,
  Briefcase,
  Bolt,
  Camera,
  ChartPie,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  CreditCard,
  DollarSign,
  Download,
  Eye,
  FileUp,
  HelpCircle,
  Home,
  Inbox,
  Landmark,
  Lock,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MessagesSquare,
  Pencil,
  Paperclip,
  Play,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  TrendingDown,
  Trophy,
  UserCircle,
  Users,
  Lightbulb,
  ChevronUp,
  ChevronsUpDown,
  X,
  XCircle,
  Bell,
  BellOff,
  type LucideIcon,
} from 'lucide-react';

type IconVariant = 'outline' | 'solid';

interface IconProps {
    name: string; // Changed to string to accept dynamic values
    variant?: IconVariant;
    size?: number;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    [key: string]: any;
}

function Icon({
    name,
    variant = 'outline',
    size = 24,
    className = '',
    onClick,
    disabled = false,
    ...props
}: IconProps) {
    const iconMap: Record<string, LucideIcon> = {
        // Navigation / common
        Bars3Icon: Menu,
        XMarkIcon: X,
        ChevronDownIcon: ChevronDown,
        ChevronLeftIcon: ChevronLeft,
        ChevronRightIcon: ChevronRight,
        ArrowRightIcon: ArrowRight,
        ArrowLeftIcon: ArrowLeft,
        ArrowUpIcon: ArrowUp,
        ArrowDownIcon: ArrowDown,
        HomeIcon: Home,
        BellIcon: Bell,
        BellAlertIcon: Bell,
        BellSlashIcon: BellOff,
        QuestionMarkCircleIcon: HelpCircle,
        Cog6ToothIcon: RefreshCw, // closest visual; overridden in newer components
        ArrowPathIcon: RefreshCw,
        ArrowDownTrayIcon: Download,
        DocumentArrowUpIcon: FileUp,
        DocumentChartBarIcon: ArrowUpRight,

        // Bookings / services / transactions
        CalendarIcon: Clock,
        CalendarDaysIcon: Clock,
        BriefcaseIcon: Briefcase,
        BanknotesIcon: Landmark,
        CreditCardIcon: CreditCard,
        CurrencyDollarIcon: DollarSign,
        ChartPieIcon: ChartPie,

        // Actions
        EyeIcon: Eye,
        PencilIcon: Pencil,
        TrashIcon: XCircle,
        EllipsisVerticalIcon: ChevronDown,
        PlusIcon: Sparkles,
        PaperClipIcon: Paperclip,
        MagnifyingGlassIcon: Search,
        InboxIcon: Inbox,
        InboxArrowDownIcon: Inbox,

        // Status / alerts
        CheckIcon: Check,
        CheckCircleIcon: CheckCircle,
        CheckBadgeIcon: CheckCircle,
        ExclamationTriangleIcon: AlertTriangle,
        InformationCircleIcon: AlertCircle,
        ShieldCheckIcon: ShieldCheck,
        LockClosedIcon: Lock,

        // Profile
        CameraIcon: Camera,
        EnvelopeIcon: Mail,
        PhoneIcon: MessagesSquare,
        MapPinIcon: MapPin,
        UserCircleIcon: UserCircle,
        UserGroupIcon: Users,
        ChatBubbleLeftIcon: MessageCircle,
        ChatBubbleLeftRightIcon: MessagesSquare,

        // Dashboard
        StarIcon: Star,
        SparklesIcon: Sparkles,
        ArrowTrendingUpIcon: TrendingUp,
        ArrowTrendingDownIcon: TrendingDown,
        LightBulbIcon: Lightbulb,
        BoltIcon: Bolt,
        TrophyIcon: Trophy,
        PlayIcon: Play,
        XCircleIcon: XCircle,
        ArrowRightOnRectangleIcon: ArrowDownToLine,
        BookmarkIcon: Bookmark,
        ChevronUpIcon: ChevronUp,
        ChevronUpDownIcon: ChevronsUpDown,
    };

    const IconComponent = iconMap[name];

    if (!IconComponent) {
        return (
            <HelpCircle
                width={size}
                height={size}
                className={`text-gray-400 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
                onClick={disabled ? undefined : onClick}
                {...props}
            />
        );
    }

    return (
        <IconComponent
            width={size}
            height={size}
            className={`${disabled ? 'opacity-50 cursor-not-allowed' : onClick ? 'cursor-pointer hover:opacity-80' : ''} ${className}`}
            onClick={disabled ? undefined : onClick}
            aria-hidden={props['aria-label'] ? undefined : true}
        />
    );
}

export default Icon; 