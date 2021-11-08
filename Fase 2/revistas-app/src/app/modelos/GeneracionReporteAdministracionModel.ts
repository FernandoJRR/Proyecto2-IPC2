export class GeneracionReporteAdministradorModel {
    public fechaDesde: Date|null
    public fechaHasta: Date|null
    public revista: number|null
    
    constructor(fechaDesde: Date|null, fechaHasta: Date|null, revista: number|null) {
        this.fechaDesde = fechaDesde;
        this.fechaHasta = fechaHasta;
        this.revista = revista;
    }
}