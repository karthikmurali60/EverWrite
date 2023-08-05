import React from "react";
import SideBar from "../components/Sidebar.js";
import Topbar from "../components/Topbar.js";

export default function HomePage() {
    return (
      <article>
        <Topbar title="Trash"/>
        <SideBar active="trash"/>
        <div className='content'>
          <p>Trash Page</p>
        </div>
      </article>
    );
  }