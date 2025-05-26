import React, { useEffect, useState } from "react";

import { DropdownOptionInterface } from "teno-dropdown-component";
import Header from "./Header";
import NavBar from "./NavBar";
import imtLogo from '../assets/imtLogo.svg';
import { useReleaseNotes } from "../hooks/useReleaseNotes";

const dropdownOptions: DropdownOptionInterface[] = [
  { value: 'imt',     label: 'IMT'},
  { value: 'hoyer',   label: 'HOYER'},
  { value: 'wabtec',  label: 'WABTEC'},
];
let dbDropdownOptions: DropdownOptionInterface[] =  [
  { value: 'dev',     label: 'DEV'},
  { value: 'staging', label: 'STAGING'},
  { value: 'pro',     label: 'PRO'},
];


const IMT_HeaderComponent: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<DropdownOptionInterface>(dropdownOptions[0]);
  const [selectedDBOption, setSelectedDBOption] = useState<DropdownOptionInterface>(dbDropdownOptions[0])

  const changeDBnames = (option:string) => {
    if (option == "imt") {
      dbDropdownOptions = [
        { value: 'dev',       label: 'DEV'},
        { value: 'staging',   label: 'STAGING'},
        { value: 'portal',    label: 'PORTAL'},
      ]
    }else if (option == "hoyer") {
      dbDropdownOptions = [
        { value: 'dev',       label: 'DEV'},
        { value: 'staging',   label: 'STAGING'},
        { value: 'teno',    label: 'TENO'},
      ]
    }else if (option == "wabtec") {
      dbDropdownOptions = [
        { value: 'dev',       label: 'DEV'},
        { value: 'staging',   label: 'STAGING'},
        { value: 'wabtec',    label: 'WABTEC'},
      ]
    }
  }
  
  const { releaseNotes } = useReleaseNotes(selectedOption.value + "-" + selectedDBOption.value)

  useEffect( () => {
    if (releaseNotes) { localStorage.setItem('releaseNotes', JSON.stringify(releaseNotes));}
  }, [releaseNotes] )

  return (
    <>
      <Header logo={imtLogo} alt="imt-logo" />
      <NavBar 
        links={[
          { to: "/", text: "Home" },
          { to: "/portal-updates", text: "Portal Updates" },
          { to: "/release-notes", text: "Release Notes" },
        ]}
        dropdownProps={{
          testId: "TEST-1",
          options: dropdownOptions,
          selectedOption: selectedOption, 
          onOptionSelected: (option) => {
            setSelectedOption(option); 
            console.log("Option selected:", option);
            // console.log("E: " + option.value + "  " + "DB: " + selectedDBOption.value)
            changeDBnames(option.value)
          },
          size: "medium"
        }}
        dropdownDBProps={{
          testId: "TEST-1",
          options: dbDropdownOptions,
          selectedOption: selectedDBOption, 
          onOptionSelected: (option) => {
            setSelectedDBOption(option); 
            console.log("Option selected:", option);
            // console.log("E: " + selectedOption.value + "  " + "DB: " + option.value)
          },
          size: "medium"
        }}
      />
      
    </>
  );
};

export default IMT_HeaderComponent;
