import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Contact, createContact } from '../State/Contacts/contact.model';
import { ContactQuery } from '../State/Contacts/contact.query';
import { ContactService } from '../Services/contact.service';
import { map } from 'rxjs/operators';
import { ContactGroup } from '../Interfaces/Group.interface';
import { UpdateService } from '../Services/update.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {



  public ContactGrouping$: Observable<ContactGroup[]>;


  constructor(private router: Router, public contactQuery: ContactQuery, public contactService: ContactService, public updateService: UpdateService) 
  {
    this.ContactGrouping$ = this.GetAll()
      .pipe(
        map(grouping => 
          {
            return {
              Contacts: grouping,
              Groups: this.GetContactGrouping(grouping)
            }
          }),
          map(groups => {
            

            for (let index = 0; index < groups.Contacts.length; index++) {
              const _contact = groups.Contacts[index];
              
              let _letter = this.GetFirstLetterFromStringOrEmoji(_contact.FirstName);

              let Grouping = groups.Groups.filter(_grp => _grp.Letter === _letter)[0];
              Grouping.Contacts.push(_contact);
            }

            //TODO - Sort Each Contact Grouping 
            
            
            return groups.Groups;
          })
        );

  }

  GetFirstLetterFromStringOrEmoji(data: string)
  {

    return data.charAt(0);


    // TODO - See if detecting Emoji as first character is even worth it
    if(data.length >= 2)
    {
      if(data.codePointAt(0) >= 128512)
      {
        return data;
      }else
      {
        return data.charAt(0);
      }
    }else
    {
      return data.charAt(0);
    }
  }

  GetContactGrouping(data: Contact[])
  {
    return data.map((Contact: any)=>{
      let _s = Contact.FirstName as string;
      
      return this.GetFirstLetterFromStringOrEmoji(_s);
    }).filter(this.GetDistinct).sort().map(g=> {
      return {
        Letter: g,
        Contacts: []
      } as ContactGroup
    } );
  }

  GetDistinct(value, index, self)
  {
    return self.indexOf(value) === index;
  }

  ngOnInit() {
  }

  GetAll(): Observable<Contact[]>
  {
    return this.contactQuery.getAll$;
  }

  AddContact()
  {
    // Populate dummy data
    this.contactService.add(createContact({FirstName:"💖💢💢💢💢💢", LastName: "Miller"}))
    this.contactService.add(createContact({FirstName:"Andrew", LastName: "Miller"}))
    this.contactService.add(createContact({FirstName:"Zack", LastName: "Miller"}))
    this.contactService.add(createContact({FirstName:"Morgan", LastName: "Miller"}))

    this.contactService.add(createContact({FirstName:"Bob", LastName: "Miller"}))
    
    this.contactService.add(createContact({FirstName:"😜", LastName: "Miller"}))

    this.contactService.add(createContact({FirstName:"👍", LastName: "Miller"}))
    this.contactService.add(createContact({FirstName:"😍", LastName: "Miller"}))

    // Navigate to add route
    //this.router.navigate(['add']);
  }

  GoTo(target: string)
  {
    // Navigate to view contact route
    //this.router.navigate(['view',target])
  }

}
