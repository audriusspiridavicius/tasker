import React from 'react'
import PaginationButton from './pagination_button'

type Settings = {
    firstPage?: boolean,
    lastPage?: boolean,
    pagesBeforeCurrent?:number,
    pagesAfterCurrent?:number,
    nextPage?:boolean,
    previousPage?:boolean,
    total_pages:number,
    current_page:number,
}

type Props = {
    settings: Settings,
    page:[number, (pageIndex:number)=> void],
}

const defaultSettings:Settings = {
    firstPage:true,
    lastPage:true,
    pagesBeforeCurrent:3,
    pagesAfterCurrent:3,
    nextPage:true,
    previousPage:true,
    total_pages:1,
    current_page:1,
}


function getMiddleSection(total_pages:number, pagesBeforeCurrent:number,pagesAfterCurrent:number, currentpage:number):[number,number]{
    var startPage = 1
    var endPage = total_pages
    var middleSectionSize = pagesAfterCurrent + pagesBeforeCurrent

    if(total_pages > middleSectionSize){
        if(currentpage == total_pages || currentpage == startPage){
            if(currentpage == startPage){
                endPage = total_pages < middleSectionSize ? total_pages : currentpage + pagesAfterCurrent + pagesBeforeCurrent;
            }
            if(currentpage == endPage){
                startPage = total_pages - middleSectionSize ;
            }
        }
        else if( currentpage <= total_pages){
           
            if(currentpage > pagesBeforeCurrent && currentpage <= total_pages - pagesAfterCurrent)
            {
                startPage = currentpage - pagesBeforeCurrent
                endPage = currentpage + pagesAfterCurrent
            }
            else if(currentpage <= pagesBeforeCurrent)
            {
                startPage = 1
                if(currentpage == pagesBeforeCurrent){
                    endPage = currentpage + pagesAfterCurrent + (pagesBeforeCurrent-(pagesBeforeCurrent - 1))
                }
                else{
                    endPage = currentpage + pagesAfterCurrent + (pagesBeforeCurrent - (pagesBeforeCurrent - currentpage))
                } 
                
            }
            else if(currentpage > total_pages - pagesAfterCurrent)
            {
                startPage = currentpage - pagesBeforeCurrent - ( pagesAfterCurrent - (total_pages - currentpage))
                endPage = total_pages
            }
            
        }
    }    

    return [startPage, endPage]
}


export default function Paging({settings = defaultSettings, page}:Props) {
  
    const [pageIndex, setPageIndex] = page;
    
    var middleSection = []
    var startEndPages = getMiddleSection(settings.total_pages, 2, 2, pageIndex)
    for (let index = startEndPages[0]; index <= startEndPages[1]; index++) {
            
        middleSection.push(index)  
    }
    return (
   <div>
    <div className='flex flex-wrap'>

        {settings.firstPage && middleSection[0] != 1 && 
            <PaginationButton current={settings.current_page==1}  onClick={()=>{setPageIndex(1)}} >1...</PaginationButton> 
        }
        {([...middleSection]).map((value,_)=>
        
            <div key={value} >
                <PaginationButton 
                    current={pageIndex==value}  
                    onClick={()=>{if(pageIndex != value){setPageIndex(value)}}}>
                        {value}
                </PaginationButton> 
            </div>
        )}
        {
            settings.lastPage && middleSection[middleSection.length-1] != settings.total_pages && 
            <PaginationButton 
                current={settings.current_page==settings.total_pages} 
                onClick={()=>{setPageIndex(settings.total_pages)}} >
                ...{settings.total_pages}
            </PaginationButton> 
        }
        </div>
   </div>
   
  )
}

