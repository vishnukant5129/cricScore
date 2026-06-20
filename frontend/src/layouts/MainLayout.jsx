import MobileLayout from "../components/mobile/MobileLayout.jsx";
import DesktopLayout from "../components/desktop/DesktopLayout.jsx";
import useDevice from "../hooks/useDevice";

export default function MainLayout() {
    const { isMobile } = useDevice();

    return isMobile ? <MobileLayout /> : <DesktopLayout />;
}