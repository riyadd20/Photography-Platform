export const categories = [
  {
    name: "nature",
    image:
      "https://images.unsplash.com/photo-1523224042829-4731dd15a3bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
  },
  {
    name: "food",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "products",
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "profile",
    image:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "sports",
    image:
      "https://images.unsplash.com/photo-1628779238951-be2c9f2a59f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHNwb3J0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "fashion",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFzaGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "travel",
    image:
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHRyYXZlbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "macro",
    image:
      "https://images.unsplash.com/photo-1484278786775-527ac0d0b608?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8TWFjcm98ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "architecture",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGFyY2hpdGVjdHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "nightlife",
    image:
      "https://images.unsplash.com/photo-1577450775949-58ec8d02cad9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bmlnaHRsaWZlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "abstract",
    image:
      "https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGFic3RyYWN0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
];

export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
        _id,
        destination,
        postedBy->{
          _id,
          userName,
          image
        },
        save[]{
          _key,
          postedBy->{
            _id,
            userName,
            image
          },
        },
      } `;

export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
      image{
        asset->{
          url
        }
      },
      _id,
      title, 
      about,
      category,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
     save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
      comments[]{
        comment,
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      }
    }`;
  return query;
};

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
          image{
            asset->{
              url
            }
          },
              _id,
              destination,
              postedBy->{
                _id,
                userName,
                image
              },
              save[]{
                _key,
                postedBy->{
                  _id,
                  userName,
                  image
                },
              },
            }`;
  return query;
};

export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};

export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
  return query;
};
