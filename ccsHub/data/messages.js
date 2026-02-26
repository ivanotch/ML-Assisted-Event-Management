export const mockEvents = [
    {
        id: '1',
        title: 'Annual Tech Symposium 2024',
        date: 'December 20, 2024',
        time: '9:00 AM - 5:00 PM',
        venue: 'Main Auditorium',
        organizer: 'Computer Science Department',
        status: 'upcoming',
        image: 'https://images.unsplash.com/photo-1613687969216-40c7b718c025?w=400',
    },
    {
        id: '2',
        title: 'Career Fair 2024',
        date: 'December 18, 2024',
        time: '10:00 AM - 4:00 PM',
        venue: 'University Convention Center',
        organizer: 'Career Services Office',
        status: 'ongoing',
        image: 'https://images.unsplash.com/photo-1761195689615-9469b65dac01?w=400',
    },
    {
        id: '3',
        title: 'Research Conference 2024',
        date: 'December 15, 2024',
        time: '8:00 AM - 6:00 PM',
        venue: 'Science Building Hall',
        organizer: 'Research & Development Office',
        status: 'ended',
        image: 'https://images.unsplash.com/photo-1747674148491-51f8a5c723db?w=400',
    },
    {
        id: '4',
        title: 'Music Festival Unplugged',
        date: 'January 5, 2025',
        time: '5:00 PM - 10:00 PM',
        venue: 'Outdoor Amphitheater',
        organizer: 'Student Council',
        status: 'upcoming',
        image: 'https://images.unsplash.com/photo-1724390265310-a4814e561d38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwZmVzdGl2YWwlMjBjb25jZXJ0fGVufDF8fHx8MTc2NTk1MjcxMHww&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'A celebration of music and talent! Enjoy performances from student bands, solo artists, and special guest performers.',
        whatToExpect: [
            'Live band performances',
            'Student talent showcase',
            'Food trucks and vendors',
            'Photo booth',
            'Raffle prizes'
        ],
        schedule: [
            { time: '5:00 PM', activity: 'Doors Open - Food & Vendors' },
            { time: '6:00 PM', activity: 'Opening Act' },
            { time: '7:00 PM', activity: 'Student Band Performances' },
            { time: '8:30 PM', activity: 'Special Guest Performance' },
            { time: '9:30 PM', activity: 'Finale & Raffle Draw' }
        ],
        photos: []
    },
    {
        id: '5',
        title: 'Leadership Summit',
        date: 'November 30, 2024',
        time: '1:00 PM - 5:00 PM',
        venue: 'Executive Training Room',
        organizer: 'Leadership Development Center',
        status: 'ended',
        image: 'https://images.unsplash.com/photo-1557734864-c78b6dfef1b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwd29ya3Nob3AlMjBhY3Rpdml0eXxlbnwxfHx8fDE3NjU5NTI3MDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Develop your leadership skills and learn from successful leaders in various fields.',
        whatToExpect: [
            'Leadership workshops',
            'Team building activities',
            'Case study discussions',
            'Mentorship sessions',
            'Leadership toolkit'
        ],
        schedule: [
            { time: '1:00 PM', activity: 'Welcome & Ice Breakers' },
            { time: '2:00 PM', activity: 'Leadership Workshop' },
            { time: '3:30 PM', activity: 'Team Building Activities' },
            { time: '4:30 PM', activity: 'Q&A and Networking' }
        ],
        photos: []
    },
    {
        id: '6',
        title: 'Startup Pitch Competition',
        date: 'December 10, 2024',
        time: '2:00 PM - 6:00 PM',
        venue: 'Innovation Hub',
        organizer: 'Entrepreneurship Center',
        status: 'cancelled',
        image: 'https://images.unsplash.com/photo-1761195689615-9469b65dac01?w=1080',
        description: 'Watch student entrepreneurs pitch their innovative startup ideas to a panel of investors and industry experts.',
        whatToExpect: [
            'Student startup presentations',
            'Live Q&A with judges',
            'Networking with investors',
            'Cash prizes for winners',
            'Mentorship opportunities'
        ],
        schedule: [
            { time: '2:00 PM', activity: 'Registration & Setup' },
            { time: '2:30 PM', activity: 'Round 1: Preliminary Pitches' },
            { time: '4:00 PM', activity: 'Round 2: Final Pitches' },
            { time: '5:30 PM', activity: 'Judges Deliberation' },
            { time: '5:45 PM', activity: 'Awards Ceremony' }
        ],
        photos: []
    }
];