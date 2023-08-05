document.addEventListener("DOMContentLoaded", function () {
    const bold = document.getElementById("bold-btn");
    const underline = document.getElementById("underline-btn");
    const italic = document.getElementById("italic-btn");
    const color = document.getElementById("color-btn");
    const newBtn = document.getElementById("new-btn");
    const txtBtn= document.getElementById("txt-btn");
    const pdfBtn = document.getElementById("pdf-btn");
    const content=document.getElementById("exampleFormControlTextarea1")
    const filename=document.getElementById("filename-input")
    const alignCenter=document.getElementById("align-center")
    const alignJustify=document.getElementById("align-justify")
    const alignLeft=document.getElementById("align-left")
    const alignRight=document.getElementById("align-right")
    const incFont=document.getElementById("inc-font")
    const decFont=document.getElementById("dec-font")
    const fontSize=document.getElementById("fontSize")
    const undoBtn=document.getElementById("undo-btn")
    const redoBtn=document.getElementById("redo-btn")
    const cutBtn=document.getElementById("cut-btn")
    const copyBtn=document.getElementById("copy-btn")
    const pasteBtn=document.getElementById("paste-btn")


    const quill = new Quill("#exampleFormControlTextarea1", {
        // theme: "snow"
    });

    cutBtn.addEventListener("click",()=>{
        document.execCommand("cut")
    })

    copyBtn.addEventListener("click",()=>{
        document.execCommand("copy")
    })

    pasteBtn.addEventListener("click", function() {
        //const editableContent = document.getElementById("editableContent");
        
        // Check if the browser supports the Clipboard API
        if (navigator.clipboard) {
          navigator.clipboard.readText().then(function(text) {
            // Insert the pasted text into the editable content
            const range = document.getSelection().getRangeAt(0);
            const fragment = range.createContextualFragment(text);
            range.deleteContents();
            range.insertNode(fragment);
          }).catch(function(error) {
            console.error('Failed to read clipboard: ', error);
          });
        } else {
          console.warn('Clipboard API is not supported in this browser.');
        }
    })

    undoBtn.addEventListener("click",()=>{
        document.execCommand("undo")
    })

    redoBtn.addEventListener("click",()=>{
        document.execCommand("redo")
    })
    
    bold.addEventListener("click", () => {
        const isBold = quill.getFormat().bold;
        quill.format("bold", !isBold);
    });

    underline.addEventListener("click", () => {
        const isUnderline=quill.getFormat().underline;
        quill.format("underline", !isUnderline);
    });

    italic.addEventListener("click", () => {
        const isItalic=quill.getFormat().italic;
        quill.format("italic", !isItalic);
    });

    alignCenter.addEventListener('click',()=>{
        
        document.execCommand("justifyCenter")
    })

    alignJustify.addEventListener('click',()=>{
        
        document.execCommand("justifyFull")
    })

    alignRight.addEventListener('click',()=>{
        
        document.execCommand("justifyRight")
    })

    alignLeft.addEventListener('click',()=>{
        
        document.execCommand("justifyLeft")
    })

 
    incFont.addEventListener('click', () => {
        const fs = parseInt(fontSize.value);
        const range = quill.getSelection();
        const newSize = fs + 2;
        fontSize.value=fs+2;
        
        if (range) {
            quill.formatText('size', newSize + 'px');
        } else {
            quill.root.style.fontSize = newSize + 'px';
        }
    });
    
   
    
    decFont.addEventListener('click', () => {
        const fs = parseInt(fontSize.value);
        const range = quill.getSelection();
        const newSize = fs - 2;
        fontSize.value=fs-2;
        
        if (range) {
            quill.format('size', newSize + 'px');
        } else {
            quill.root.style.fontSize = newSize + 'px';
        }
    });
    
    
    
    

    color.addEventListener("input", () => {
        const selectedColor = color.value;
        quill.format("color", selectedColor);
    });

    newBtn.addEventListener('click',()=>{
        content.innerHTML=""  
    })

    txtBtn.addEventListener('click',()=>{
        const a=document.createElement('a')
        const blob=new Blob([content.innerText])
        const dataUrl= URL.createObjectURL(blob)
        a.href=dataUrl
        a.download=filename.value+".txt"
        a.click()
    })

    pdfBtn.addEventListener('click',()=>{
        html2pdf().from(content).save(filename.value)
    })

    document.getElementById('fontSelector').addEventListener('change', function() {
        var selectedFont = this.value;
        console.log(selectedFont)
        document.execCommand('fontName', false, selectedFont);
    });
    
    
    
});
