export class GeneracionReporteEditorModel {
    public fechaDesde: Date|null
    public fechaHasta: Date|null
    public revista: number|null
    public editor: string
    
    constructor(fechaDesde: Date|null, fechaHasta: Date|null, revista: number|null, editor: string) {
        this.fechaDesde = fechaDesde;
        this.fechaHasta = fechaHasta;
        this.revista = revista;
        this.editor = editor;
    }
}