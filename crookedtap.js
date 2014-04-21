Reviews = new FS.Collection("reviews", {
  stores: [new FS.Store.FileSystem("images", {path: "~/uploads"})]
});



if (Meteor.isClient) {
  var inputRating = document.getElementById('inputRating');
  
  Template.reviewList.helpers({
    reviews: function() {
      return Reviews.find();
    },
  })


  Template.reviewList.events = {
    'click input.delete': function () {
      Reviews.remove(this._id);
    }
    /*
    ,
    'click input.edit': function () {
      var new_message = document.getElementById("inputName").value;
      if(new_message.length <= 0){
        console.log('too short');
      } else {
        Reviews.update(this._id, {name: new_message});                
      }
    }*/
  };

/*
Template.form.events({
  'change #inputFile': function(event, template) {
    var files = event.target.files;
    console.log(files);
    for (var i = 0, ln = files.length; i < ln; i++) {
      Reviews.insert(files[i], function (err, fileObj) {
        //Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
      });
    }
  }
});
*/

  
  Template.form.events = {
    'submit form': function( event, template) {
      event.preventDefault();
      var new_name = template.find("#inputName");;
      var new_rating = template.find("#inputRating");
      var new_picture = template.find("#inputFile");

      var data = {
        reviewName: new_name.value,
        reviewRating: new_rating.value,
        reviewPicture: new_picture.value
      };
        //new_picture: new_picture.value;
      
      //new_picture.value="";

      var files = new_picture.files;
      console.log(files);

      for (var i = 0, ln = files.length; i < ln; i++) {
          Reviews.insert(files[i], function (err, fileObj) {
        });
      }

      //Reviews.insert(files, function (err, fileObj) {});
      console.log('Review added'); 
      //console.log(files);
    },
    'keypress input.add': function (evt) {
      if (evt.which === 13) {
        console.log('enter');
      }
    }
  };


}

if (Meteor.isServer) {        
  Meteor.startup(function () {
    // code to run on server at startup
  });
}



