export const IdealCustomer = [
    {
        title: "Audience",
        queries: [
            {
                query:"Who is the decision maker?",
                fields:[
                    {
                        name: "Gender",
                        database_label: "customer_gender",
                        prompt: "We are going to make customer persona. Customer is the decision maker to make the purchase and user is the one who will use the [product_service]. From now, answer with only 1 word. What's the ideal customer gender for [productservice_type] [product_service]? Answer in one word."
                    }, {
                        name: "Monthly_Income",
                        database_label: "customer_monthly_income",
                        prompt: "What's the customer income for [productservice_type] [product_service]? Answer in minimum-maximum number format and in USD without showing $ symbol or “USD”."
                    }, {
                        name: "Education",
                        database_label: "customer_education",
                        prompt: "What's the customer education level for [productservice_type] [product_service]? Answer in common education level categories."
                    }, {
                        name: "Age",
                        database_label: "customer_age",
                        prompt: "What's the customer age range for [productservice_type] [product_service]? Answer in number form."
                    }, {
                        name: "Marital status",
                        database_label: "customer_marital_status",
                        prompt: "What's the customer marital for [productservice_type] [product_service]? Answer in one word."
                    }, {
                        name: "How many children do they have",
                        database_label: "customer_children_number",
                        prompt: "How many children the customer have for [productservice_type] [product_service]? Answer in number form."
                    }, {
                        name: "Ethnicity/Cultural background",
                        database_label: "customer_ethnicity",
                        prompt: "What's the customer ethnicity or cultural background for [productservice_type] [product_service]? Answer in one word."
                    }, {
                        name: "Interest ",
                        database_label: "customer_interest",
                        prompt: "What's the customer interest for [productservice_type] [product_service]?"
                    }, {
                        name: "Any other thing that might related?",
                        database_label: "customer_related_interest",
                        prompt: "What's other thing that might related to the customer using [productservice_type] [product_service]?"
                    }, {
                        name: "Where do they spend their time Online?",
                        database_label: "customer_spent_onlineplatform",
                        prompt: "Where does the customer spend their time online for [productservice_type] [product_service]?"
                    }, {
                        name: "Where do they spend their time in Offline or Real life?",
                        database_label: "customer_spent_reallife",
                        prompt: "Where does the customer spend their time in real life for [productservice_type] [product_service]?"
                    }, {
                        name: "What are their preferred communication channels?",
                        database_label: "customer_preffered_com_channel",
                        prompt: "What is the customer preferred communication channels for [productservice_type] [product_service]? Separate answer using comma without &."
                    }
                ],
            },
            {
                query:"Who is the user?",
                fields:[
                    {
                        name: "Gender",
                        database_label: "customer_gender_2",
                        prompt: "We are going to make customer persona. Customer is the decision maker to make the purchase and user is the one who will use the [product_service]. From now, answer with only 1 word. What's the ideal customer gender for [productservice_type] [product_service]? Answer in one word."
                    }, {
                        name: "Monthly_Income",
                        database_label: "customer_monthly_income_2",
                        prompt: "What's the customer income for [productservice_type] [product_service]? Answer in minimum-maximum number format and in USD without showing $ symbol or “USD”."
                    }, {
                        name: "Education",
                        database_label: "customer_education_2",
                        prompt: "What's the customer education level for [productservice_type] [product_service]? Answer in common education level categories."
                    }, {
                        name: "Age",
                        database_label: "customer_age_2",
                        prompt: "What's the customer age range for [productservice_type] [product_service]? Answer in number form."
                    }, {
                        name: "Marital status",
                        database_label: "customer_marital_status_2",
                        prompt: "What's the customer marital for [productservice_type] [product_service]? Answer in one word."
                    }, {
                        name: "How many children do they have",
                        database_label: "customer_children_number_2",
                        prompt: "How many children the customer have for [productservice_type] [product_service]? Answer in number form."
                    }, {
                        name: "Ethnicity/Cultural background",
                        database_label: "customer_ethnicity_2",
                        prompt: "What's the customer ethnicity or cultural background for [productservice_type] [product_service]? Answer in one word."
                    }, {
                        name: "Interest",
                        database_label: "customer_interest_2",
                        prompt: "What's the customer interest for [productservice_type] [product_service]?"
                    }, {
                        name: "Any other thing that might related?",
                        database_label: "customer_related_interest_2",
                        prompt: "What's other thing that might related to the customer using [productservice_type] [product_service]?"
                    }, {
                        name: "Where do they spend their time Online?",
                        database_label: "customer_spent_onlineplatform_2",
                        prompt: "Where does the customer spend their time online for [productservice_type] [product_service]?"
                    }, {
                        name: "Where do they spend their time in Offline or Real life?",
                        database_label: "customer_spent_reallife_2",
                        prompt: "Where does the customer spend their time in real life for [productservice_type] [product_service]?"
                    }, {
                        name: "What are their preferred communication channels?",
                        database_label: "customer_preffered_com_channel_2",
                        prompt: "What is the customer preferred communication channels for [productservice_type] [product_service]? Separate answer using comma without &."
                    }, {
                        name: "Relationship to the user",
                        database_label: "customer_user_relationship_2",
                        prompt: "What is the customer relationship with ideal user for [productservice_type] [product_service]? Answer in one word."
                    }
                ],
            },
        ]
    }, {
        title: "Problems",
        queries: [
            {
                query: "What are their pain points?",
                fields: [
                    {
                        name: "What are their complaints?",
                        database_label: "user_complaints",
                        prompt: "What is the user common complaint when using existing [productservice_type] [product_service]?"
                    }, {
                        name: "What are their frustrations/challenges?",
                        database_label: "user_frustrations",
                        prompt: "What is the user top frustration when using [productservice_type] [product_service]? "
                    }, {
                        name: "What job they currently need to do to solve it? ",
                        database_label: "user_hardwork",
                        prompt: "What are the most troublesome things they need to do to use existing [productservice_type] [product_service]?"
                    }, {
                        name: "What are their bad experiences in the past?",
                        database_label: "user_bad_experiences",
                        prompt: "What are the bad experiences when they use existing [productservice_type] [product_service] in the past?"
                    }, 
                ]
            },
            {
                query:"What do they value?",
                fields:[
                    {
                        name: "What do they value?",
                        database_label: "user_expectedvalue",
                        prompt: "What do they value or expect when using similar [productservice_type] [product_service]?"
                    }
                ]
            }
        ]
    }, {
        title: "Solutions",
        queries:[
            {
                query:"How is this product/service?",
                fields: [
                    {
                        name: "How will it solve the problems",
                        database_label: "user_productservice_solution",
                        prompt: "Base on previous problems, convince ideal customer how [productservice_type] [product_service] can solve their problem. Answer one by one of [user_complaints], [user_frustrations], [user_hardwork] and [user_bad_experiences] respectively in concise responses."
                    }, {
                        name: "How it works",
                        database_label: "user_productservice_howitwork",
                        prompt: "Base on [user_productservice_solution], explain how it works to solve their problem in concise responses."
                    }, {
                        name: "Price",
                        database_label: "user_productservice_base_price",
                        prompt: "Based on current market price, suggest pricing for  [productservice_type] [product_service]. Answer in one word and USD without showing $ symbol or “USD”. "
                    }, {
                        name: "How many variation/package?",
                        database_label: "productservice_variation_price",
                        prompt: "Recommend 3 pricing starting from $[user_productservice_base_price]  to $[user_productservice_base_price]x10 that are most compelling in terms of psychology.  Just give the answer without explanation."
                    }, {
                        name: "How will the product/solution improve their lives or make things easier for them?",
                        database_label: "user_lifeimprovement",
                        prompt: "Based on [user_expectedvalue], how can this [productservice_type] [product_service] add value to their live?"
                    }, {
                        name: "What can you do to go above and beyond their expectation?",
                        database_label: "user_beyondexpectation",
                        prompt: "Based on [user_expectedvalue], how can this [productservice_type] [product_service] surprise and “wow” beyond the ideal customer expectation?"
                    }, 
                ]
            },
            {
                query:"What are their beliefs and attitudes?",
                fields:[
                    {
                        name: "What are their sentiments to your solution?",
                        database_label: "user_sentiments",
                        prompt: "What are the customer beliefs, attitudes or sentiments to [user_productservice_solution]?"
                    }, 
                ]
            },
            {
                query:"What are their expected outcomes?",
                fields:[
                    {
                        name: "Expected outcome",
                        database_label: "user_expectedoutcome",
                        prompt: "What are their expected outcomes from [user_productservice_solution]? Answer in super concise and simple in one liner."
                    }, {
                        name: "How long will it take?",
                        database_label: "user_expectedduration",
                        prompt: "How long do they expect to get tangible result from [user_productservice_solution]? Only answer with how many days without description or further explanation."
                    }, 
                ]
            },
            {
                query:"What are simple steps that they can take to solve their problems?",
                fields:[
                    {
                        name: "What are simple steps that they can take to solve their problems?",
                        database_label: "user_motivate_need",
                        prompt: "Give 3 simple steps the customer can take to solve their problem if they use [productservice_type] [product_service]. Answer in 3 step and concise."
                    },
                ]
            },
        ]
    }, {
        title: "Objections",
        queries:[
            {
                query:"What are their objections to your product/service?",
                fields:[
                    {
                        name: "FAQ ",
                        database_label: "user_faq",
                        prompt: "What are customer common objections using [productservice_type] [product_service]? List the question and followed by the counter responses that rational, reasonable and convincing in FAQ style. "
                    }, {
                        name: "And real-life example (side by side)",
                        database_label: "user_faq1",    // duplicated label
                        prompt: "From [user_faq], give real life experience example on each point. Respond in point form respectively."
                    },
                ]
            },
            {
                query:"What do they think of your competitors?",
                fields:[
                    {
                        name: "Who are the competitors?",
                        database_label: "productservice_competitors",
                        prompt: "Name all competitor of [productservice_type] [product_service] available in market. Separate answer using comma without &."
                    }, {
                        name: "Better",
                        database_label: "productservice_competitors_advantages",
                        prompt: "By referring [user_productservice_solution], why, how and what the ideal customer think [productservice_competitors] better than our [productservice_type] [product_service]. "
                    },
                ]
            },
            {
                query:"What is your product/service weakness?",
                fields:[
                    {
                        name: "Worst",
                        database_label: "productservice_competitors_disadvantages",
                        prompt: "By referring [user_productservice_solution], why, how and what the ideal customer think [productservice_competitors] worse than our [productservice_type] [product_service]."
                    }, {
                        name: "Why you are different? (Compare with your product sentiment above)",
                        database_label: "productservice_unique_vscompetitor",
                        prompt: "By referring [user_productservice_solution], why, how and what the ideal customer think [productservice_competitors] different, unique and outstanding than our [productservice_type] [product_service]."
                    }
                ]
            },
        ],
    }, {
        title: "Social Proof",
        queries:[
            {
                query:"Is there any social proof?",
                fields:[
                    {
                        name: "Review/Rating [text box] *user manual key-in",
                        database_label: "social_proof",
                        prompt: "Is there any social proof?"
                    }, 
                ]
            },
            {
                query:"Research/Case study",
                fields:[
                    {
                        name: "Research/Case study",
                        database_label: "productservice_casestudy",
                        prompt: "Summarize case study supporting our [user_productservice_solution] will solve the ideal customers problems. Include the source url for each respond."
                    }
                ]
            },
        ],
        fields: [
        ]
    }, {
        title: "FOMO",
        queries:[
            {
                query:"What will they miss or suffer if they did not use the product/service?",
                fields:[
                    {
                        name: "user fomo",
                        database_label: "user_fomo",
                        prompt: "What will ideal customer miss if they do not use [productservice_type] [product_service]."
                    }, 
                ]
            },
            {
                query:"What consequences will you face if you don't find a solution to this problem?",
                fields:[
                    {
                        // "[user_frustrations], [user_hardwork]"
                        name: "user consequences",
                        database_label: "user_consequences",
                        prompt: "What are the bad consequences ideal customer will have to face if they didn't find the solution. Answer one by one of [user_complaints],  and [user_bad_experiences] respectively in concise responses."
                    },
                ]
            },
        ],
    }, {
        title: "Bonus",
        queries:[
            {
                query:"What is the thing that customer really wants?",
                fields:[
                    {
                        name: "user hope",
                        database_label: "user_hope",
                        prompt: "Else than [user_productservice_solution], [user_lifeimprovement] & [user_beyondexpectation], what are other things that the customer might want or wish for?"
                    },  
                ]
            },
            {
                query:"What challenges do your ideal customer face in their daily life or work that they wish that your product/service could solve?",
                fields:[
                    {
                        name: "user wish",
                        database_label: "user_wish",
                        prompt: "Else than [user_complaints], [user_frustrations], [user_hardwork] & [user_bad_experiences], what challenges do ideal customer face in their daily life or work that they wish they could solve?"
                    },
                ]
            },
            {
                query:"What will they get if they use the product/service?",
                fields:[
                    {
                        name: "What will they get if they use the product/service?",
                        database_label: "user_wish_granted",
                        prompt: "What will your [productservice_type] [product_service] offer to grant their [user_wish]."
                    },
                ]
            },
            {
                query:"What is your guarantee?",
                fields:[
                    {
                        name: "Unconditional",
                        database_label: "user_guarantee_unconditional",
                        prompt: "Make an unconditional guarantee to customer. Answer in this format: If [productservice_brand] don't achieve [user_expectedoutcome] in [user_expectedduration] we will (the unconditional guarantee offers)."
                    }, {
                        name: "Conditional",
                        database_label: "user_guarantee_conditional",
                        prompt: "Now, make a conditional guarantee to customer. Answer in this format: If [productservice_brand] don't achieve [user_expectedoutcome] in [user_expectedduration] we will (the unconditional guarantee offers)."
                    }, {
                        name: "Anti-Guarantee",
                        database_label: "user_guarantee_anti",
                        prompt: "Now, make an “anti-guarantee” guarantee to customer. Answer in this format:  If [productservice_brand] don't achieve [user_expectedoutcome] in [user_expectedduration] we will (the “anti-guarantee” guarantee offers)."
                    }, {
                        name: "Implied Guarantee",
                        database_label: "user_guarantee_implied",
                        prompt: "Now, make an implied guarantee to customer. Answer in this format: If [productservice_brand] don't achieve [user_expectedoutcome] in [user_expectedduration] we will (the unconditional guarantee offers)."
                    },
                ]
            },
        ],
    }, {
        title: "Trigger",
        queries:[
            {
                query:"What are the triggers/attention?",
                fields:[
                    {
                        name: "Curiosity ",
                        database_label: "user_curiosity",
                        prompt: "What is the possible thing might grab audience curiosity related to [productservice_type] [product_service]? Answer in one liner sentence."
                    }, {
                        name: "Current issue",
                        database_label: "user_currentissue",
                        prompt: "What is the current issue that might grab audience attention related to [productservice_type] [product_service]? Answer in one liner sentence."
                    }, {
                        name: "Trends ",
                        database_label: "user_currentissue",
                        prompt: "What is the current trend or hype that might grab audience attention related to [productservice_type] [product_service]? Answer in one liner sentence."
                    }, {
                        name: "Controversy ",
                        database_label: "user_controversy",
                        prompt: "What is the common controversy that might grab audience attention related to [productservice_type] [product_service]? Answer in one liner sentence."
                    }, {
                        name: "Question that audience feel eager to answer (wanting to answer and feel needed/respected or attention seeker)",
                        database_label: "user_eagertoanswer",
                        prompt: "What is the question that might trigger audience eager to answer related to [productservice_type] [product_service]? Respond in one liner sentence. "
                    }, {
                        name: "Funny ",
                        database_label: "user_joke",
                        prompt: "What is the joke that might grab audience attention related to [productservice_type] [product_service]? Answer in one liner sentence."
                    }, {
                        name: "Anger ",
                        database_label: "user_anger",
                        prompt: "What is the thing that might trigger audience anger related to [productservice_type] [product_service]? Answer in one liner sentence. "
                    }, {
                        name: "Wow outcome",
                        database_label: "user_wow",
                        prompt: "What is the thing that might “wow” audience related to [productservice_type] [product_service]? Answer in one liner sentence."
                    }, 
                ]
            },
            {
                query:"What motivates them to take action?",
                fields:[
                    {
                        name: "Any specific need?",
                        database_label: "user_motivate_need",
                        prompt: "What is the ideal customer specific need that motivate them to take action related to [productservice_type] [product_service]? Answer as catchy headline in one liner sentence."
                    },
                    {
                        name: "Any specific desire?",
                        database_label: "user_motivate_desire",
                        prompt: "What is the ideal customer specific desire that motivate them to take action related to [productservice_type] [product_service]? Answer as catchy headline in one liner sentence."
                    }, {
                        name: "Any discounts? ",
                        database_label: "user_discount",
                        prompt: "What is the discount that motivate them to take action related to [productservice_type] [product_service]? Answer as catchy headline in one liner sentence. "
                    }, {
                        name: "Any other special offers?",
                        database_label: "user_specialoffer",
                        prompt: "What is the special offer for ideal customer specific need that motivate them to take action related to [productservice_type] [product_service]? Answer as catchy headline in one liner sentence."
                    }
                ]
            },
        ],
    }, 
];
export const funnelStages = [
    "Awareness", 
    "Interest",
    "Desire",
    "Purchase",
    "Adoption",
    "Retention",
    "Expansion",
    "Advocacy"
];
export const contentTypes = [
    "original", 
    "complimentary", 
    "related", 
    "indirectly_related", 
    "counter_criticism"
];
export const temperatures = [
    { name: 0, value:0},
    { name: 0.1, value:0.1},
    { name: 0.2, value:0.2},
    { name: 0.3, value:0.3},
    { name: 0.4, value:0.4},
    { name: 0.5, value:0.5},
    { name: 0.6, value:0.6},
    { name: 0.7, value:0.7},
    { name: 0.8, value:0.8},
    { name: 0.9, value:0.9},
    { name: 1, value:1},
];

export const media = [
    "WEB",
    "EMAIL",
    "SOCIAL MEDIA"
];
export const courseType = [
    "Main",
    "Appetizer",
    "Desert"
];

export const cognitiveFunction = [
    "XX",  
    "Ni", 
    "Ne", 
    "Si", 
    "Se", 
    "Ti", 
    "Te", 
    "Fi", 
    "Fe",
];

export const mbti = [
    "XXXX",
    "ISTJ", 
    "ISFJ", 
    "INFJ", 
    "INTJ", 
    "ISTP", 
    "ISFP", 
    "INFP", 
    "INTP", 
    "ESTJ", 
    "ESFJ", 
    "ENFJ", 
    "ENTJ", 
    "ESTP", 
    "ESFP", 
    "ENFP", 
    "ENTP",
]

export const HOME_LINK_USER = "/customer/profiles";
export const HOME_LINK_ADMIN = "/agents/new/template";