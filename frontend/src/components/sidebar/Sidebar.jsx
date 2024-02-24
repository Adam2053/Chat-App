import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import useConversation from "../../zustand/useConversation";
import { useEffect, useState } from "react";

const Sidebar = () => {
	const {selectedConversation,setSelectedConversation} = useConversation();
	useEffect(()=>{
		// cleaned up 
		return ()=> setSelectedConversation(null);
	},[setSelectedConversation])

	const [display, setDisplay] = useState('');
	useEffect(()=>{
		if(selectedConversation){
            setDisplay('hidden');
        }else{
			setDisplay('');
		}
	},[selectedConversation])
	return (
		<div className={`border-r border-slate-500 p-4 flex flex-col bg-slate-300 max-sm:${display}`}>
			<SearchInput />
			<div className='divider px-3'></div>
			<Conversations />
			<LogoutButton />
		</div>
	);
};
export default Sidebar;