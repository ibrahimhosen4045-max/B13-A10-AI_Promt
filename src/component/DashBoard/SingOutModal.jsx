// "use client";

// import { LogOut } from "lucide-react";
// import { Button, Modal } from "@heroui/react";
// import { authClient } from "@/lib/auth-client";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

// export default function SignOutModal() {
//   const router = useRouter();

//   const handleSignOut = async () => {
//     try {
//       await authClient.signOut();

//       toast.success("Signed out successfully!");

//       router.push("/");
//       router.refresh();
//     } catch (error) {
//       toast.error("Failed to sign out.");
//     }
//   };

//   return (
//     <Modal>
//       <Button
//         className="w-full justify-start bg-transparent text-red-400 hover:bg-red-500/10"
//       >
//         <LogOut className="mr-2 h-5 w-5" />
//         Sign Out
//       </Button>

//       <Modal.Backdrop>
//         <Modal.Container size="sm">
//           <Modal.Dialog className="bg-[#111827] border border-red-500/20">
//             <Modal.CloseTrigger />

//             <Modal.Header>
//               <Modal.Icon className="bg-red-500/10 text-red-500">
//                 <LogOut className="h-5 w-5" />
//               </Modal.Icon>

//               <Modal.Heading>
//                 Sign Out
//               </Modal.Heading>
//             </Modal.Header>

//             <Modal.Body>
//               <p className="text-gray-300">
//                 Are you sure you want to sign out of your account?
//               </p>
//             </Modal.Body>

//             <Modal.Footer>
//               <Button slot="close" variant="secondary">
//                 Cancel
//               </Button>

//               <Button
//                 color="danger"
//                 onPress={handleSignOut}
//               >
//                 Sign Out
//               </Button>
//             </Modal.Footer>
//           </Modal.Dialog>
//         </Modal.Container>
//       </Modal.Backdrop>
//     </Modal>
//   );
// }