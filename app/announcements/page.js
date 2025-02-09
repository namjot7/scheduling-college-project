'use client'
import { AddBtn, DeleteBtn } from '@/components/design/icons'
import Layout from '@/components/Layout'
import Section from '@/components/Section'
import React, { useEffect, useState } from 'react'

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showAnnForm, setShowAnnForm] = useState(false);

  const getAnnouncements = async () => {
    const res = await fetch('/api/announcements');
    const result = await res.json();
    const data = result.data[0];
    // console.log(data);
    setAnnouncements(data);
  }
  const createAnnouncement = async (e) => {
    e.preventDefault();
    // if (!title.trim() || !description.trim()) return;
    const date = new Date().toISOString().split('T')[0];
    const announcementData = {
      title, description, date
    }
    // console.log(announcementData);

    const res = await fetch('/api/announcements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(announcementData),
    });
    const result = await res.json();
    console.log(result);

    // Reset form
    // setTitle("");
    // setDescription("");
  };

  const showAnnco = async () => {

    // if (res.ok) {
    //     console.log('Announcement created:', result);
    //     // Optionally refresh the list of announcements
    //     getAnnouncements();
    // } else {
    //     console.error('Error creating announcement:', result.message);
    // }
  }
  const deleteAnnouncement = async (id) => {
    try {
      const res = await fetch(`/api/announcements/${id}`, {
        method: 'DELETE',
      });

      const result = await res.json();
      if (res.ok) {
        console.log('Announcement deleted:', result);
        // Optionally refresh the list of announcements
        getAnnouncements();
      } else {
        console.error('Error deleting announcement:', result.message);
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  };

  useEffect(() => {
    getAnnouncements()

  }, [])
  // useEffect(() => {
  //     console.log(announcements);
  // }, [announcements])

  return (
    <Layout>
      <Section title={"Announcements"}>
        <AddBtn className="absolute top-24 right-4" showForm={setShowAnnForm} text={"Post"} />

        {/* New annoucmente form */}
        <form className={`${showAnnForm ? 'block' : 'hidden'}  form-basic`} onSubmit={e => createAnnouncement(e)}>
          <h4 className="h3">Create New Announcement</h4>
          <input type="text" placeholder="Title" value={title}
            onChange={(e) => setTitle(e.target.value)} required />
          <textarea rows="7" placeholder="Description" value={description}
            onChange={(e) => setDescription(e.target.value)} required />
          <button type="submit" className="w-full btn-primary mt-5">
            Submit
          </button>
        </form>

        {/* Announcements */}
        <div className="mt-16">
            {announcements?.length > 0 && announcements.map((item, idx) => (
              <div key={idx} className="flex justify-between px-5 py-3 border-b-2 border-slate-300">
                <div className="w-2/3">
                  <h4 className='h4'>{item.title}</h4>
                  <p>{item.summary}</p>
                </div>
                <div className="flex items-end gap-3 flex-col">
                  <div>Posted On: {item.date.split('T')[0]}</div>
                  <DeleteBtn onClickFunc={""} />
                </div>
              </div>
            ))}
        </div>
      </Section>
    </Layout>
  )
}

export default Announcements