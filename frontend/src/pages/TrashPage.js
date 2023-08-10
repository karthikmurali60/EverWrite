import React from "react";
import SideBar from "../components/Sidebar.js";
import Topbar from "../components/Topbar.js";
import NoteCard from "../components/NoteCard.js";
import { get } from "../lib/Requests";
import Cookies from "js-cookie";
import { Circles } from "react-loader-spinner";

export default function TrashPage() {
  const [notes, setNotes] = React.useState([]);
  const dataFetchedRef = React.useRef(false);
  const [user, setUser] = React.useState(Cookies.get("username"));
  const [isLoading, setIsLoading] = React.useState(true);

  const loadData = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/${user}/notes?type=trash`;
    get(url, {
      success: function (data) {
        setIsLoading(false);
        setNotes(data);
      },
    });
  };

  React.useEffect(() => {
    //prevents double call
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    loadData();
  }, []);

  return (
    <article>
      <Topbar title="Trash" />
      <SideBar active="trash" />
      <div className="content">
        {isLoading ? (
          <Circles
            height="4em"
            width="4em"
            color="#1D201F"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : (
          <div className="cardGrid">
            {notes.map((note) => {
              return <NoteCard key={note._id} data={note} trashed="true" />;
            })}
          </div>
        )}
      </div>
    </article>
  );
}
