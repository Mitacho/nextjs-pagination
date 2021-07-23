import React from "react";

import Head from "next/head";
import Image from "next/image";

import NavigationButton from "../components/NavigationButton";

import FirstPageIcon from "../components/Icons/FirstPage";
import LastPageIcon from "../components/Icons/LastPage";
import NavigateBeforeIcon from "../components/Icons/NavigateBefore";
import NavigateNextIcon from "../components/Icons/NavigateNext";

import { postsFromFakeAPI, Post } from "../fakeAPI/posts";

import GlobalStyles from "../styles/Global";

import { prefix } from "../prefix";

export default function Home(): JSX.Element {
  const posts: Post[] = postsFromFakeAPI;
  
  const [ isLoading, setIsLoading ] = React.useState<boolean>(true);

  const [ visiblePosts, updateVisiblePosts ] = React.useState<Post[]>([]);

  const [ perPage, updatePerPage ] = React.useState<number>(5);
  const [ currentPage, updateCurrentPage ] = React.useState<number>(1);
  const [ totalPages, updateTotalPages ] = React.useState<number>(Math.ceil(posts.length / perPage));

  const [ visibleButtonPages, updateVisibleButtonPages ] = React.useState<number[]>([]);
  
  function nextPage(): void {
    const nextPage: number = currentPage + 1;

    if(nextPage > totalPages) return;

    updateCurrentPage(nextPage);
  };

  function previousPage(): void {
    const previousPage: number = currentPage - 1;

    if(currentPage === 1 || previousPage < 1) return;

    updateCurrentPage(previousPage);
  };

  function goToPage(page: number): void {
    const pageExceedsMaximumValue: boolean = page > totalPages;
    const pageExceedsMinimumValue: boolean = page < 1;

    if(pageExceedsMaximumValue) {
      updateCurrentPage(totalPages);
    }

    else if(pageExceedsMinimumValue) {
      updateCurrentPage(1);
    }

    else {
      updateCurrentPage(page);
    }
  };

  /**
   * This function will run only once.
   * 
   * GET the posts from our fake API
   * and put them into the posts variable.
   */ 
  React.useEffect(() => {
    const numberOfPosts: number = posts.length;
    const postsPerPage: number = perPage;

    updateTotalPages(Math.ceil(numberOfPosts / postsPerPage));

    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    function calculateVisibleButtons(): void {
      /**
       * The number of buttons is specific.
       * Therefore some numbers work, some do not.
       */
      const maxVisibleButtons: number = 3;
  
      let numberOfButtonsToBeShownOnTheLeft: number = currentPage - Math.floor((maxVisibleButtons / 2));
      let numberOfButtonsToBeShownOnTheRight: number = currentPage + Math.floor((maxVisibleButtons / 2));
  
      const isOnTheLastPage: boolean = numberOfButtonsToBeShownOnTheRight > totalPages;
      const isOnTheStartPage: boolean = numberOfButtonsToBeShownOnTheLeft < 1;
  
      if(isOnTheStartPage) {
        numberOfButtonsToBeShownOnTheLeft = 1;
        numberOfButtonsToBeShownOnTheRight = maxVisibleButtons;
  
        if(numberOfButtonsToBeShownOnTheRight > totalPages) {
          numberOfButtonsToBeShownOnTheRight = totalPages;
        }
      }
  
      if(isOnTheLastPage) {
        numberOfButtonsToBeShownOnTheLeft = totalPages - (maxVisibleButtons - 1);
        numberOfButtonsToBeShownOnTheRight = totalPages;
  
        if(numberOfButtonsToBeShownOnTheLeft < 1) {
          numberOfButtonsToBeShownOnTheLeft = 1;
        }
      }
  
      let pages: number[] = [];
  
      for(
        let page: number = numberOfButtonsToBeShownOnTheLeft;
        page <= numberOfButtonsToBeShownOnTheRight;
        page++
      ) {
        pages.push(page);
      }
  
      updateVisibleButtonPages(pages);
    };

    function recalculate(): void {
      updateTotalPages(Math.ceil(posts.length / perPage));

      if(currentPage > totalPages) {
        updateCurrentPage(totalPages);
      }

      const page: number = currentPage - 1;
      const start: number = page * perPage;
      const end: number = start + perPage;
      
      updateVisiblePosts(posts.slice(start, end));
      
      calculateVisibleButtons();

      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    recalculate();
  }, [currentPage, perPage, totalPages]);

  return (
    <div>
      <GlobalStyles />

      <Head>
        <title>NextJS Pagination</title>
        <meta name="title" content="NextJS Pagination" />
        <meta name="description" content="A page reference to build a pagination in Reactjs apps. This app was develop using Reactjs, NextJS, and TypeScript." />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mitacho.github.io/nextjs-pagination" />
        <meta property="og:title" content="NextJS Pagination" />
        <meta property="og:description" content="A page reference to build a pagination in Reactjs apps. This app was develop using Reactjs, NextJS, and TypeScript." />
        <meta property="og:image" content={`${prefix}/og.png`} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://mitacho.github.io/nextjs-pagination" />
        <meta property="twitter:title" content="NextJS Pagination" />
        <meta property="twitter:description" content="A page reference to build a pagination in Reactjs apps. This app was develop using Reactjs, NextJS, and TypeScript." />
        <meta property="twitter:image" content={`${prefix}/og.png`} />

        <meta name="keywords" content="NextJS, Pagination" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        <link rel="icon" href={`${prefix}/favicon.ico`} />
      </Head>

      <header
        style={headerCSS}
      >
        <div>
          <h1
          style={titleCSS}
          >
            NextJS Pagination
          </h1>
        </div>
        <div>
          <select
            style={selectButtonCSS}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => updatePerPage(Number(event.target.value))}
            defaultValue={perPage}
          >
            <option value="5">5 per page</option>
            <option value="10">10 per page</option>
          </select>
        </div>
      </header>

      <main>
        <section
          style={contentCSS}
        >
          {
            isLoading
            ? <p>Loading posts ...</p>
            : (
                visiblePosts.map(({ id, photo, author, location, publishedOn }: Post) => {
                  return(
                    <article
                      style={cardCSS}
                      key={id}
                    >
                      <div
                        style={cardWrapperCSS}
                      >
                        <header>
                          <figure
                            style={cardFigureCSS}
                          >
                            <Image
                              src={photo}
                              alt="Image"

                              height={500}
                              width={500}

                              objectFit="cover"
                            />
                          </figure>
                        </header>
                        <div
                          style={cardDetailsCSS}
                        >
                          <p>
                            Author: 
                            <a
                              href={`https://unsplash.com/@${author}`}
                              target="_blank"
                              title="author profile on Unsplash"
                              rel="noreferrer"
                            >
                              {" "}@{author}
                            </a>
                          </p>
                          <address>
                            <p>{location}</p>
                          </address>
                          <time
                            dateTime={publishedOn}
                            title={publishedOn}
                          >
                            {
                              new Date(publishedOn).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                              })
                            }
                          </time>
                        </div>
                      </div>
                    </article>
                  );
                })
              )
          }
        </section>
      </main>

      <footer
        style={footerCSS}
      >
        <div
          style={navigationCSS}
        >
          <NavigationButton
            content={
              <FirstPageIcon
                fill="var(--light-gray)"
                height="16px"
                width="16px"
              />
            }
            isActive={false}
            onClick={() => goToPage(1)}
          />
          <NavigationButton
            content={
              <NavigateBeforeIcon
                fill="var(--light-gray)"
                height="16px"
                width="16px"
              />
            }
            isActive={false}
            onClick={() => previousPage()}
          />
          {
            visibleButtonPages.map(page => {
              return(
                <NavigationButton
                  key={page}
                  content={String(page)}
                  onClick={() => goToPage(page)}
                  isActive={currentPage === page}
                />
              );
            })
          }
          <NavigationButton
            content={
              <NavigateNextIcon
                fill="var(--light-gray)"
                height="16px"
                width="16px"
              />
            }
            isActive={false}
            onClick={() => nextPage()}
          />
          <NavigationButton
            content={
              <LastPageIcon
                fill="var(--light-gray)"
                height="16px"
                width="16px"
              />
            }
            isActive={false}
            onClick={() => goToPage(totalPages)}
          />
        </div>
        <div
          style={footerChildrenCSS}
        >
          <p>
            Results: {
              isLoading
              ? "Loading ..."
              : posts.length
            }
          </p>
        </div>
        <div
          style={footerChildrenCSS}
        >
          <p>
            Total pages: {
              isLoading
              ? "Loading ..."
              : totalPages
            }
          </p>
        </div>
        <div
          style={footerChildrenCSS}
        >
          <p>
            <a
              href="https://unsplash.com/"
              target="_blank"
              title="https://unsplash.com/"
              rel="noreferrer"
            >
              Images from Unsplash
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

const headerCSS: React.CSSProperties = {
  height: "3.375rem",
  width: "100%",

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  paddingLeft: "1rem",
  paddingRight: "1rem",

  position: "sticky",
  
  top: 0,
  left: 0,
  right: 0,
  
  zIndex: 2,

  boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.15)",

  backgroundColor: "var(--bg-accent)"
};

const selectButtonCSS: React.CSSProperties = {
  minWidth: "7rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  appearance: "none",

  backgroundColor: "var(--gray)",

  padding: "0.5rem 1rem",

  borderRadius: "0.25rem",

  textAlign: "center",
  textJustify: "auto",

  fontWeight: 500,

  color: "var(--white)",

  cursor: "pointer",
  
  boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.15)",
};

const contentCSS: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, 16rem)",
  gap: "1rem",
  justifyContent: "center",


  padding: "1rem",

  backgroundColor: "var(--bg)"
};

const cardCSS: React.CSSProperties = {
  maxWidth: "36rem",
  width: "100%",

  display: "flex",
  justifyContent: "space-between",

  borderRadius: "0.5rem",

  padding: "1rem",

  backgroundColor: "var(--bg-accent)",
};

const cardDetailsCSS: React.CSSProperties = {
  maxWidth: "14rem",
  width: "100%",
};

const cardWrapperCSS: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, 16rem)",
};

const cardFigureCSS: React.CSSProperties = {
  width: "14rem",
};

const footerCSS: React.CSSProperties = {
  width: "100%",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",

  textAlign: "center",

  padding: "1rem",

  backgroundColor: "transparent"
};

const footerChildrenCSS: React.CSSProperties = {
  margin: "0.5rem 0",
};

const navigationCSS: React.CSSProperties = {
  display: "flex",

  margin: "1rem 0",
};

const titleCSS: React.CSSProperties = {
  fontSize: "1.5rem"
};