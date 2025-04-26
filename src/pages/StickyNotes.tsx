import { Header } from "@/components/Header";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Footer from "@/components/Footer";
import { StickyNotes } from "@/components/StickyNotes";

export default function StickyNotesPage() {
    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full">
                <AppSidebar />
                <div className="flex-1 flex flex-col">
                    <Header />
                    <main className="flex-1 container mx-auto py-6 px-4 md:px-6">
                        <h1 className="text-3xl font-bold text-futuristic-white">Sticky Notes</h1>
                        <p className="text-lg text-gray-500">Capture your ideas and reminders here.</p>
                        <StickyNotes />
                    </main>
                    <Footer />
                </div>
            </div>
        </SidebarProvider>
    );
}