class StateDatas {
    private static instance: StateDatas;
    
    //Portal updates
    private _PortalUpdatesVersion: string = "";
    private _PortalUpdatesUpdateAt: string = "";
    private _PortalUpdatesNextScheduledUpdate: string = "";
    private _PortalUpdatesEnabled: string = "false";
    
    //Release notes
    private _ReleaseNotesVersion: string = "";
    private _ReleaseNotesContent: string = "";
    private _ReleaseNotesStartDate: Date | null = null;
  
    private constructor() {}
  
    public static getInstance(): StateDatas {
      if (!StateDatas.instance) {
        StateDatas.instance = new StateDatas();
      }
      return StateDatas.instance;
    }

    //Portal updates
    public get PortalUpadtesVersion(): string{
        return this._PortalUpdatesVersion
    }
    public set PortalUpadtesVersion(value: string){
      this._PortalUpdatesVersion = value
      localStorage.setItem('PortalUpdatesVersion', value)
    }

    public get PortalUpdatesUpdatedAt(){
      return this._PortalUpdatesUpdateAt
    }
    public set PortalUpdatesUpdatedAt(value: string){
      this._PortalUpdatesUpdateAt = value
      localStorage.setItem('PortalUpdatesUpdatedAt', value)
    }
    public get PortalUpdatesNextScheduledUpdate(){
      return this._PortalUpdatesNextScheduledUpdate
    }
    public set PortalUpdatesNextScheduledUpdate(value: string){
      this._PortalUpdatesNextScheduledUpdate = value
      localStorage.setItem('PortalUpdatesNextScheduledUpdate', value)
    }
    public get PortalUpdatesEnabled(){
      return this._PortalUpdatesEnabled
    }
    public set PortalUpdatesEnabled(value: string){
      this._PortalUpdatesEnabled = value
      localStorage.setItem('PortalUpdatesEnabled', value)
    }
      
    //Release Notes
    public get ReleaseNotesVersion(): string {
      return this._ReleaseNotesVersion;
    }
  
    public set ReleaseNotesVersion(value: string) {
      this._ReleaseNotesVersion = value;
      localStorage.setItem('ReleaseNotesVersion', value)
    }
  
    public get ReleaseNotesContent(): string {
      return this._ReleaseNotesContent;
    }
  
    public set ReleaseNotesContent(value: string) {
      this._ReleaseNotesContent = value;
      localStorage.setItem('ReleaseNotesContent', value)
    }
  
    public get ReleaseNotesStartDate(): Date | null {
      return this._ReleaseNotesStartDate;
    }
  
    public set ReleaseNotesStartDate(value: Date | null) {
      this._ReleaseNotesStartDate = value;
      if (value) {
        localStorage.setItem('ReleaseNotesDate', value.toString())
      }
    }
  }
  
  export default StateDatas;