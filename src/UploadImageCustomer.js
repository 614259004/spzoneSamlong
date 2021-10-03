import React, { Component } from "react";
//Import npm react-filepond
import { FilePond, File, registerPlugin } from 'react-filepond';
import firebase from 'firebase';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';

import FilePondImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginFileRename from 'filepond-plugin-file-rename';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
registerPlugin(FilePondPluginFileRename);
registerPlugin(FilePondImagePreview);
registerPlugin(FilePondPluginImageCrop);



export default class Uploadimage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            files: [], //ใช้เก็บข้อมูล File ที่ Upload
            uploadValue: 0, //ใช้เพื่อดู Process การ Upload
            filesMetadata:[], //ใช้เพื่อรับข้อมูล Metadata จาก Firebase
            rows:  [], //ใช้วาด DataTable
            messag:'',
            picture:''

        };

        // Initialize Firebase
            var config = {
                apiKey: "AIzaSyA8buGUiHZMdAfO4YhsrVA6fTGjlUqzHI8",
                authDomain: "se-shabu60.firebaseapp.com",
                databaseURL: "https://se-shabu60.firebaseio.com",
                projectId: "se-shabu60",
                storageBucket: "se-shabu60.appspot.com",
                messagingSenderId: "789798527769"
            };
            if (!firebase.apps.length) {
                firebase.initializeApp(config);
             }

    }
    

    handleInit() {
        // handle init file upload here
        console.log('now initialised', this.pond);
      }
    
    handleProcessing(fieldName, file, metadata, load, error, progress, abort) {
       
        
        console.log(" handle file upload here");
        console.log(file);
        
        const fileUpload = file;
        const storageRef = firebase.storage().ref(`filepond/${file.name}`);
        const task = storageRef.put(fileUpload)

        task.on(`state_changed` , (snapshort) => {
            console.log(snapshort.bytesTransferred, snapshort.totalBytes)
            let percentage = (snapshort.bytesTransferred / snapshort.totalBytes) * 100;
            load(percentage);
            //Process
            this.setState({
                uploadValue:percentage
            })
        } , (error) => {
            //Error
            this.setState({
                messag:`Upload error : ${error.message}`
            })
        } , () => {
            //Success
            task.snapshot.ref.getDownloadURL().then((downloadURL) =>{
                console.log('File available at', downloadURL);
                this.props.imagename(downloadURL);
              });
            
          

          
        })
        

      }

      
  

    render() {
        var loadTimeInMS = Date.now()
        var performanceNow = require("performance-now")
       
       return(
            <div className="App">
               
              <FilePond allowMultiple={true}
                  ref= {ref => this.pond = ref}
                  credits={false}
                  /*server={{ process: this.handleProcessing.bind(this) }}*/
                  oninit={() => this.handleInit()}
                  allowImageCrop={true} 
                  imageCropAsectRatio ="1:1"
                  /*stylePanelLayout = "circle"*/
                  allowFileRename={true} fileRenameFunction={file => { return `img-${loadTimeInMS + performanceNow() * 1000}${file.extension}` }} 
                >    
                  
              {/* Set current files using the <File/> component */}
              {this.state.files.map(file => (
                <File key={file} source={file} />
              ))}

          </FilePond>
            </div>
       )
        
    }
}