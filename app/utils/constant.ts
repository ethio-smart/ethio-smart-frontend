export const locations = [
  "Addis Ketema, Addis Ababa",
  "Akaki Kality, Addis Ababa",
  "Arada, Addis Ababa",
  "Bole, Addis Ababa",
  "Gullele, Addis Ababa",
  "Kirkos, Addis Ababa",
  "Kolfe Keranio, Addis Ababa",
  "Lemi Kura, Addis Ababa",
  "Lideta, Addis Ababa",
  "Nifas Silk-Lafto, Addis Ababa",
  "Yeka, Addis Ababa",
  "Burayu, Sheger City",
  "Sebeta, Sheger City",
  "Sululta, Sheger City",
  "Dire Dawa City, Dire Dawa",
  "Adama City, Oromia",
  "Bahir Dar City, Amhara",
  "Gondar City, Amhara",
  "Mekelle City, Tigray",
  "Jimma City, Oromia",
]

type FieldType = "text" | "number" | "select" | "boolean" | "multiselect";
interface FieldOption {
  label: string;
  value: string;
}

interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  options?: FieldOption[] | string[];
  required?: boolean;
  placeholder?: string;
}

export const categoryFields: Record<string, FieldConfig[]> = {
  tutoring: [
    {
      name: "subject",
      label: "Subject",
      type: "text",
      placeholder: "e.g Mathematics, Physics",
    },
    {
      name: "educationLevel",
      label: "Education Level",
      type: "select",
      options: ["Primary", "Secondary", "High School", "University"],
      placeholder: "Select education level",
    },
    {
      name: "mode",
      label: "Mode",
      type: "select",
      options: ["Online", "Offline"],
      placeholder: "Choose mode",
    },
    {
      name: "sessionsPerWeek",
      label: "Sessions per Week",
      type: "number",
      placeholder: "e.g. 3",
    },
    {
      name: "duration",
      label: "Session Duration (minutes)",
      type: "number",
      placeholder: "e.g. 60",
    },
    {
      name: "studentAge",
      label: "Student Age",
      type: "number",
      placeholder: "e.g. 12",
    },
    {
      name: "examPreparation",
      label: "Exam Preparation?",
      type: "boolean",
    },
  ],

  cleaning: [
    {
      name: "cleaningType",
      label: "Cleaning Type",
      type: "select",
      options: ["Home", "Office", "Industrial"],
      placeholder: "Select cleaning type",
    },
    {
      name: "propertyType",
      label: "Property Type",
      type: "select",
      options: ["Apartment", "House", "Villa", "Office"],
      placeholder: "Select property type",
    },
    {
      name: "rooms",
      label: "Number of Rooms",
      type: "number",
      placeholder: "e.g. 3",
    },
    {
      name: "bathrooms",
      label: "Number of Bathrooms",
      type: "number",
      placeholder: "e.g. 2",
    },
    {
      name: "supplies",
      label: "Cleaning Supplies Provided?",
      type: "boolean",
    },
    {
      name: "pets",
      label: "Pets Present?",
      type: "boolean",
    },
    {
      name: "extraServices",
      label: "Extra Services",
      type: "multiselect",
      options: [
        "Window Cleaning",
        "Deep Cleaning",
        "Carpet Cleaning",
        "Laundry",
        "Kitchen Deep Clean",
      ],
      placeholder: "Select extra services",
    },
  ],
};