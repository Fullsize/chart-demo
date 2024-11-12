export default function downloadFileByBlob(blob: any, fileName: any) {
    if (blob) {
        const link = document.createElement('a');
        const dname = decodeURIComponent(fileName);
        link.style.display = 'none';
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', dname);
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
            document.body.removeChild(link);
        }, 0);
    }
}
