window.BOARD_CRITERIA = {
 "al-statewide": {
  "anchors_declared": 0,
  "bounds_source": "US Census TIGERweb state geometry",
  "excluded": 1,
  "gates": {
   "finalist_count": 20,
   "min_weight_covered": 0.35,
   "min_weighted_score": 0.25,
   "near_miss_score": 0.5
  },
  "greenfield_min_acres": 2.0,
  "jurisdictions": 14,
  "land_classes": [
   "INDUSTRIAL_PARK",
   "INDUSTRIAL_VACANT"
  ],
  "max_miles": 5.0,
  "metrics": [
   {
    "comment": "SPARE GENERATION at the host, in MW, from a utility account record, an interconnection record, or the plant's own written capacity vs output. Redefined in v4: this is spare generation at the plant, not merely deliverable load at a meter, because the thesis buys power at the source. Still the heaviest single weight.",
    "ladder": [
     [
      "1",
      "No generation and no service, or service removed: meter pulled and transformer reclaimed."
     ],
     [
      "4",
      "Under 250 kW spare. A new service study and a queue position are required."
     ],
     [
      "7",
      "1-2 MW spare on the existing plant, confirmed by an account or interconnection record."
     ],
     [
      "10",
      "5 MW or more spare today at an operating plant, confirmed by the utility or the operator."
     ]
    ],
    "metric": "power_headroom",
    "weight": 0.15
   },
   {
    "comment": "POWER AT THE SOURCE, and RESILIENCE folded in. The measured path from generator to rack, in feet. Nothing is lost to transmission and nothing is paid to move it. At the top of this scale on-site generation is the PRIMARY supply rather than the backup, so the line to the property is not the single point of failure.",
    "ladder": [
     [
      "1",
      "No generation on or adjacent to the site. Every electron arrives over somebody else's line."
     ],
     [
      "4",
      "Generation within a few miles, reached over the public distribution system at retail."
     ],
     [
      "7",
      "Generation on the same parcel or adjacent, behind one meter, but the utility line is still the primary supply."
     ],
     [
      "10",
      "Generator to rack measured in feet, on-site generation as PRIMARY supply, the utility line demoted to backup."
     ]
    ],
    "metric": "generation_proximity",
    "weight": 0.13
   },
   {
    "comment": "Lit fiber quality plus the diversity of the second physical path (separate conduit, separate right-of-way). MEASURED 2026-09-16 on run 65 from the Nevada OSIT fiber route inventory: 197 of 210 parcels across 4 grades, instrumented weight 0.57 -> 0.68. THAT SOURCE CANNOT REACH EITHER END OF THIS SCALE, by design. Grade 10 needs separate conduit AND separate rights-of-way; the inventory names a route's owner and never whose trench it shares, so two providers within a mile caps at 7 -- and no parcel in this region reaches even that, because two distinct providers never appear within a mile of one. Grade 1 asserts no lit fiber at the property line; the inventory is the state build programme, not a census of carrier plant, so a parcel with no route within five miles is UNKNOWN and costs the full 0.11, never 1. Only the fiber_redundant screen -- a carrier confirming lit service plus a second path -- can produce a 10 or a 1, and it outranks the route proxy in both directions. FCC Form 477 was tried first and REJECTED: 1 parcel of 210, and nil at TRIC where Switch and Tesla operate, because 477 collects mass-market premises service, not carrier routes.",
    "ladder": [
     [
      "1",
      "No lit fiber at the property line."
     ],
     [
      "4",
      "One lit carrier, single path. An outage on that path is a total outage."
     ],
     [
      "7",
      "Two carriers, but sharing one physical right-of-way for part of the run."
     ],
     [
      "10",
      "Two or more lit carriers on physically separate conduit and separate rights-of-way."
     ]
    ],
    "metric": "fiber_diversity",
    "weight": 0.11
   },
   {
    "comment": "RAPID DEPLOYMENT. Months to energized, and specifically what sits on the critical path: a queue position, new transmission, or utility equipment. What is left when none of those apply is site work and assembly.",
    "ladder": [
     [
      "1",
      "Interconnection queue position required, multi-year, with new transmission on the critical path."
     ],
     [
      "4",
      "No new transmission, but utility equipment with a long lead time is on the critical path."
     ],
     [
      "7",
      "No queue and no new transmission; a utility equipment swap runs parallel to site work."
     ],
     [
      "10",
      "No queue position, no new transmission, no utility equipment on the critical path. Site work and assembly only: months, not years."
     ]
    ],
    "metric": "interconnect_speed",
    "weight": 0.09
   },
   {
    "comment": "How well the by-right use matches, beyond the pass/fail of screen 3. Lyon YLDUSE 500-series = Industrial scores high. An operating industrial plant that already hosts generation is the easy case.",
    "ladder": [
     [
      "1",
      "Use is not contemplated by the code; a rezone would be required."
     ],
     [
      "4",
      "Allowed only by conditional or special use permit, decided at a public hearing."
     ],
     [
      "7",
      "Allowed by right in an industrial district, with conditions on scale or screening."
     ],
     [
      "10",
      "Allowed by right administratively in an industrial district, with no scale cap."
     ]
    ],
    "metric": "zoning_fit",
    "weight": 0.08
   },
   {
    "comment": "Clear height, clean span, floor loading, dock and roof condition. DOWNWEIGHTED in v4 from 0.12: the kit repeats, so a shell is a convenience beside a generator rather than the thing being hunted.",
    "ladder": [
     [
      "1",
      "No structure, or a shell that has to come down."
     ],
     [
      "4",
      "Under 50,000 sf, or clear height under 18 ft, or a span full of columns."
     ],
     [
      "7",
      "100,000-250,000 sf, 24-32 ft clear, clean span, slab adequate."
     ],
     [
      "10",
      "250,000 sf or more, 32 ft or greater clear, clean long span, heavy slab, docks intact."
     ]
    ],
    "metric": "building_shell",
    "weight": 0.08
   },
   {
    "comment": "CLEAN LOAD BY CONSTRUCTION. The facility is carbon-free because of WHERE IT STANDS, not because of a certificate bought to say so. Grades the generation actually behind the meter, not a contracted attribute.",
    "ladder": [
     [
      "1",
      "Coal or oil generation behind the meter, or grid power with no carbon-free source on site."
     ],
     [
      "4",
      "Gas generation on site. Better than the grid on a marginal basis, not carbon-free."
     ],
     [
      "7",
      "Carbon-free generation on site but intermittent, so a carbon-bearing source covers part of the load."
     ],
     [
      "10",
      "Firm carbon-free generation on site covering the load by construction. No certificate involved."
     ]
    ],
    "metric": "carbon_free_source",
    "weight": 0.06
   },
   {
    "comment": "Margin outside the 500-year outline, not merely outside it. Levee-dependent is a fatal screen, not a low score.",
    "ladder": [
     [
      "1",
      "Inside the SFHA, or levee-dependent. This is a fatal screen, not merely a low grade."
     ],
     [
      "4",
      "Outside the SFHA but inside the 500-year outline."
     ],
     [
      "7",
      "Outside the 500-year outline, but close to it or in the same drainage."
     ],
     [
      "10",
      "Well outside the 500-year outline, with elevation margin and no upstream impoundment."
     ]
    ],
    "metric": "flood_position",
    "weight": 0.06
   },
   {
    "comment": "REVENUE FOR THE HOST. What the host's power is worth TODAY without us, which is what makes us a firm buyer worth having. Curtailment volume and weak local pricing are the signal: a plant selling everything at a good price has no reason to talk to us.",
    "ladder": [
     [
      "1",
      "Host is fully contracted at a strong price. No curtailment, no spare offtake, nothing to sell us."
     ],
     [
      "4",
      "Occasional curtailment or a soft hour or two. The gain to the host is real but marginal."
     ],
     [
      "7",
      "Routine curtailment, or output sold into a weak local market well below a firm bilateral price."
     ],
     [
      "10",
      "Heavy curtailment or deeply negative local pricing. A firm buyer beside the generator is transformative for the host."
     ]
    ],
    "metric": "host_revenue_upside",
    "weight": 0.05
   },
   {
    "comment": "Usable acreage for the equipment yard: switchgear, cooling, fuel where it applies, and the setbacks around them.",
    "ladder": [
     [
      "1",
      "No usable yard. Equipment would have to go inside or on the roof."
     ],
     [
      "4",
      "Under 2 usable acres. The core equipment fits; fuel and switchgear setbacks do not."
     ],
     [
      "7",
      "5-10 usable acres: the full equipment yard fits with its setbacks."
     ],
     [
      "10",
      "20 or more usable, level, contiguous acres, with room to repeat the kit."
     ]
    ],
    "metric": "yard_room",
    "weight": 0.05
   },
   {
    "comment": "Phase I findings beyond clean/not-clean: adjacent RECs, EPA FRS neighbours, historical use. A prior informs this grade; only a Phase I decides screen 7.",
    "ladder": [
     [
      "1",
      "Known contamination, open remediation, or a listed site on the parcel."
     ],
     [
      "4",
      "Prior dirty process on the parcel and no Phase I yet: elevated prior."
     ],
     [
      "7",
      "Clean Phase I, but with adjacent RECs or an EPA FRS neighbour."
     ],
     [
      "10",
      "Clean Phase I, no RECs on or adjacent to the parcel, benign process history."
     ]
    ],
    "metric": "environmental",
    "weight": 0.05
   },
   {
    "comment": "Committed water and sewer capacity, and whether a will-serve letter exists.",
    "ladder": [
     [
      "1",
      "No committed water or sewer; an extension would be required."
     ],
     [
      "4",
      "Service exists but capacity is unconfirmed and there is no will-serve letter."
     ],
     [
      "7",
      "Adequate committed capacity; a will-serve letter is obtainable."
     ],
     [
      "10",
      "Written will-serve letter in hand, covering full build-out."
     ]
    ],
    "metric": "water_sewer",
    "weight": 0.04
   },
   {
    "comment": "Heavy-haul route, interstate access, rail spur if present.",
    "ladder": [
     [
      "1",
      "No heavy-haul route: load-restricted bridges or a residential approach."
     ],
     [
      "4",
      "Heavy haul possible, with permits and a detour."
     ],
     [
      "7",
      "Direct heavy-haul route to an interstate within 5 miles."
     ],
     [
      "10",
      "Direct heavy-haul route, interstate within 5 miles, and an active rail spur on site."
     ]
    ],
    "metric": "transport_access",
    "weight": 0.03
   },
   {
    "comment": "Local skilled labour depth and abatement posture. Deliberately the lightest weight: it is the easiest thing to be sold and the hardest to bank.",
    "ladder": [
     [
      "1",
      "No local skilled trades; hostile or absent incentive posture."
     ],
     [
      "4",
      "Thin trades pool; incentives exist but we do not qualify."
     ],
     [
      "7",
      "Adequate electrical and mechanical trades; standard abatements available."
     ],
     [
      "10",
      "Deep trades pool with data centre experience and a signed-off abatement path."
     ]
    ],
    "metric": "labor_and_incentives",
    "weight": 0.02
   }
  ],
  "min_acres": 2.0,
  "min_acres_source": "greenfield.evaluate_parcel min_acres default",
  "name": "Alabama, statewide",
  "region": "al-statewide",
  "scale": {
   "_comment": "1 is the worst defensible state, 10 the best. 1 contributes 0.0.",
   "max": 10,
   "min": 1
  },
  "spare_mw_floors": [
   0.5,
   1.0,
   2.0,
   5.0,
   10.0,
   20.0,
   40.0,
   80.0,
   150.0
  ],
  "state": "AL"
 },
 "nv-statewide": {
  "anchors_declared": 124,
  "bounds_source": "US Census TIGERweb state geometry",
  "excluded": 1,
  "gates": {
   "finalist_count": 20,
   "min_weight_covered": 0.35,
   "min_weighted_score": 0.25,
   "near_miss_score": 0.5
  },
  "greenfield_min_acres": 2.0,
  "jurisdictions": 19,
  "land_classes": [
   "INDUSTRIAL_PARK",
   "INDUSTRIAL_VACANT"
  ],
  "max_miles": 5.0,
  "metrics": [
   {
    "comment": "SPARE GENERATION at the host, in MW, from a utility account record, an interconnection record, or the plant's own written capacity vs output. Redefined in v4: this is spare generation at the plant, not merely deliverable load at a meter, because the thesis buys power at the source. Still the heaviest single weight.",
    "ladder": [
     [
      "1",
      "No generation and no service, or service removed: meter pulled and transformer reclaimed."
     ],
     [
      "4",
      "Under 250 kW spare. A new service study and a queue position are required."
     ],
     [
      "7",
      "1-2 MW spare on the existing plant, confirmed by an account or interconnection record."
     ],
     [
      "10",
      "5 MW or more spare today at an operating plant, confirmed by the utility or the operator."
     ]
    ],
    "metric": "power_headroom",
    "weight": 0.15
   },
   {
    "comment": "POWER AT THE SOURCE, and RESILIENCE folded in. The measured path from generator to rack, in feet. Nothing is lost to transmission and nothing is paid to move it. At the top of this scale on-site generation is the PRIMARY supply rather than the backup, so the line to the property is not the single point of failure.",
    "ladder": [
     [
      "1",
      "No generation on or adjacent to the site. Every electron arrives over somebody else's line."
     ],
     [
      "4",
      "Generation within a few miles, reached over the public distribution system at retail."
     ],
     [
      "7",
      "Generation on the same parcel or adjacent, behind one meter, but the utility line is still the primary supply."
     ],
     [
      "10",
      "Generator to rack measured in feet, on-site generation as PRIMARY supply, the utility line demoted to backup."
     ]
    ],
    "metric": "generation_proximity",
    "weight": 0.13
   },
   {
    "comment": "Lit fiber quality plus the diversity of the second physical path (separate conduit, separate right-of-way). MEASURED 2026-09-16 on run 65 from the Nevada OSIT fiber route inventory: 197 of 210 parcels across 4 grades, instrumented weight 0.57 -> 0.68. THAT SOURCE CANNOT REACH EITHER END OF THIS SCALE, by design. Grade 10 needs separate conduit AND separate rights-of-way; the inventory names a route's owner and never whose trench it shares, so two providers within a mile caps at 7 -- and no parcel in this region reaches even that, because two distinct providers never appear within a mile of one. Grade 1 asserts no lit fiber at the property line; the inventory is the state build programme, not a census of carrier plant, so a parcel with no route within five miles is UNKNOWN and costs the full 0.11, never 1. Only the fiber_redundant screen -- a carrier confirming lit service plus a second path -- can produce a 10 or a 1, and it outranks the route proxy in both directions. FCC Form 477 was tried first and REJECTED: 1 parcel of 210, and nil at TRIC where Switch and Tesla operate, because 477 collects mass-market premises service, not carrier routes.",
    "ladder": [
     [
      "1",
      "No lit fiber at the property line."
     ],
     [
      "4",
      "One lit carrier, single path. An outage on that path is a total outage."
     ],
     [
      "7",
      "Two carriers, but sharing one physical right-of-way for part of the run."
     ],
     [
      "10",
      "Two or more lit carriers on physically separate conduit and separate rights-of-way."
     ]
    ],
    "metric": "fiber_diversity",
    "weight": 0.11
   },
   {
    "comment": "RAPID DEPLOYMENT. Months to energized, and specifically what sits on the critical path: a queue position, new transmission, or utility equipment. What is left when none of those apply is site work and assembly.",
    "ladder": [
     [
      "1",
      "Interconnection queue position required, multi-year, with new transmission on the critical path."
     ],
     [
      "4",
      "No new transmission, but utility equipment with a long lead time is on the critical path."
     ],
     [
      "7",
      "No queue and no new transmission; a utility equipment swap runs parallel to site work."
     ],
     [
      "10",
      "No queue position, no new transmission, no utility equipment on the critical path. Site work and assembly only: months, not years."
     ]
    ],
    "metric": "interconnect_speed",
    "weight": 0.09
   },
   {
    "comment": "How well the by-right use matches, beyond the pass/fail of screen 3. Lyon YLDUSE 500-series = Industrial scores high. An operating industrial plant that already hosts generation is the easy case.",
    "ladder": [
     [
      "1",
      "Use is not contemplated by the code; a rezone would be required."
     ],
     [
      "4",
      "Allowed only by conditional or special use permit, decided at a public hearing."
     ],
     [
      "7",
      "Allowed by right in an industrial district, with conditions on scale or screening."
     ],
     [
      "10",
      "Allowed by right administratively in an industrial district, with no scale cap."
     ]
    ],
    "metric": "zoning_fit",
    "weight": 0.08
   },
   {
    "comment": "Clear height, clean span, floor loading, dock and roof condition. DOWNWEIGHTED in v4 from 0.12: the kit repeats, so a shell is a convenience beside a generator rather than the thing being hunted.",
    "ladder": [
     [
      "1",
      "No structure, or a shell that has to come down."
     ],
     [
      "4",
      "Under 50,000 sf, or clear height under 18 ft, or a span full of columns."
     ],
     [
      "7",
      "100,000-250,000 sf, 24-32 ft clear, clean span, slab adequate."
     ],
     [
      "10",
      "250,000 sf or more, 32 ft or greater clear, clean long span, heavy slab, docks intact."
     ]
    ],
    "metric": "building_shell",
    "weight": 0.08
   },
   {
    "comment": "CLEAN LOAD BY CONSTRUCTION. The facility is carbon-free because of WHERE IT STANDS, not because of a certificate bought to say so. Grades the generation actually behind the meter, not a contracted attribute.",
    "ladder": [
     [
      "1",
      "Coal or oil generation behind the meter, or grid power with no carbon-free source on site."
     ],
     [
      "4",
      "Gas generation on site. Better than the grid on a marginal basis, not carbon-free."
     ],
     [
      "7",
      "Carbon-free generation on site but intermittent, so a carbon-bearing source covers part of the load."
     ],
     [
      "10",
      "Firm carbon-free generation on site covering the load by construction. No certificate involved."
     ]
    ],
    "metric": "carbon_free_source",
    "weight": 0.06
   },
   {
    "comment": "Margin outside the 500-year outline, not merely outside it. Levee-dependent is a fatal screen, not a low score.",
    "ladder": [
     [
      "1",
      "Inside the SFHA, or levee-dependent. This is a fatal screen, not merely a low grade."
     ],
     [
      "4",
      "Outside the SFHA but inside the 500-year outline."
     ],
     [
      "7",
      "Outside the 500-year outline, but close to it or in the same drainage."
     ],
     [
      "10",
      "Well outside the 500-year outline, with elevation margin and no upstream impoundment."
     ]
    ],
    "metric": "flood_position",
    "weight": 0.06
   },
   {
    "comment": "REVENUE FOR THE HOST. What the host's power is worth TODAY without us, which is what makes us a firm buyer worth having. Curtailment volume and weak local pricing are the signal: a plant selling everything at a good price has no reason to talk to us.",
    "ladder": [
     [
      "1",
      "Host is fully contracted at a strong price. No curtailment, no spare offtake, nothing to sell us."
     ],
     [
      "4",
      "Occasional curtailment or a soft hour or two. The gain to the host is real but marginal."
     ],
     [
      "7",
      "Routine curtailment, or output sold into a weak local market well below a firm bilateral price."
     ],
     [
      "10",
      "Heavy curtailment or deeply negative local pricing. A firm buyer beside the generator is transformative for the host."
     ]
    ],
    "metric": "host_revenue_upside",
    "weight": 0.05
   },
   {
    "comment": "Usable acreage for the equipment yard: switchgear, cooling, fuel where it applies, and the setbacks around them.",
    "ladder": [
     [
      "1",
      "No usable yard. Equipment would have to go inside or on the roof."
     ],
     [
      "4",
      "Under 2 usable acres. The core equipment fits; fuel and switchgear setbacks do not."
     ],
     [
      "7",
      "5-10 usable acres: the full equipment yard fits with its setbacks."
     ],
     [
      "10",
      "20 or more usable, level, contiguous acres, with room to repeat the kit."
     ]
    ],
    "metric": "yard_room",
    "weight": 0.05
   },
   {
    "comment": "Phase I findings beyond clean/not-clean: adjacent RECs, EPA FRS neighbours, historical use. A prior informs this grade; only a Phase I decides screen 7.",
    "ladder": [
     [
      "1",
      "Known contamination, open remediation, or a listed site on the parcel."
     ],
     [
      "4",
      "Prior dirty process on the parcel and no Phase I yet: elevated prior."
     ],
     [
      "7",
      "Clean Phase I, but with adjacent RECs or an EPA FRS neighbour."
     ],
     [
      "10",
      "Clean Phase I, no RECs on or adjacent to the parcel, benign process history."
     ]
    ],
    "metric": "environmental",
    "weight": 0.05
   },
   {
    "comment": "Committed water and sewer capacity, and whether a will-serve letter exists.",
    "ladder": [
     [
      "1",
      "No committed water or sewer; an extension would be required."
     ],
     [
      "4",
      "Service exists but capacity is unconfirmed and there is no will-serve letter."
     ],
     [
      "7",
      "Adequate committed capacity; a will-serve letter is obtainable."
     ],
     [
      "10",
      "Written will-serve letter in hand, covering full build-out."
     ]
    ],
    "metric": "water_sewer",
    "weight": 0.04
   },
   {
    "comment": "Heavy-haul route, interstate access, rail spur if present.",
    "ladder": [
     [
      "1",
      "No heavy-haul route: load-restricted bridges or a residential approach."
     ],
     [
      "4",
      "Heavy haul possible, with permits and a detour."
     ],
     [
      "7",
      "Direct heavy-haul route to an interstate within 5 miles."
     ],
     [
      "10",
      "Direct heavy-haul route, interstate within 5 miles, and an active rail spur on site."
     ]
    ],
    "metric": "transport_access",
    "weight": 0.03
   },
   {
    "comment": "Local skilled labour depth and abatement posture. Deliberately the lightest weight: it is the easiest thing to be sold and the hardest to bank.",
    "ladder": [
     [
      "1",
      "No local skilled trades; hostile or absent incentive posture."
     ],
     [
      "4",
      "Thin trades pool; incentives exist but we do not qualify."
     ],
     [
      "7",
      "Adequate electrical and mechanical trades; standard abatements available."
     ],
     [
      "10",
      "Deep trades pool with data centre experience and a signed-off abatement path."
     ]
    ],
    "metric": "labor_and_incentives",
    "weight": 0.02
   }
  ],
  "min_acres": 2.0,
  "min_acres_source": "greenfield.evaluate_parcel min_acres default",
  "name": "Nevada, statewide",
  "region": "nv-statewide",
  "scale": {
   "_comment": "1 is the worst defensible state, 10 the best. 1 contributes 0.0.",
   "max": 10,
   "min": 1
  },
  "spare_mw_floors": [
   0.5,
   1.0,
   2.0,
   5.0,
   10.0,
   20.0,
   40.0,
   80.0,
   150.0
  ],
  "state": "NV"
 },
 "ri-statewide": {
  "anchors_declared": 111,
  "bounds_source": "US Census TIGERweb state geometry",
  "excluded": 4,
  "gates": {
   "finalist_count": 20,
   "min_weight_covered": 0.35,
   "min_weighted_score": 0.25,
   "near_miss_score": 0.5
  },
  "greenfield_min_acres": 2.0,
  "jurisdictions": 5,
  "land_classes": [
   "INDUSTRIAL_PARK",
   "INDUSTRIAL_VACANT"
  ],
  "max_miles": 5.0,
  "metrics": [
   {
    "comment": "SPARE GENERATION at the host, in MW, from a utility account record, an interconnection record, or the plant's own written capacity vs output. Redefined in v4: this is spare generation at the plant, not merely deliverable load at a meter, because the thesis buys power at the source. Still the heaviest single weight.",
    "ladder": [
     [
      "1",
      "No generation and no service, or service removed: meter pulled and transformer reclaimed."
     ],
     [
      "4",
      "Under 250 kW spare. A new service study and a queue position are required."
     ],
     [
      "7",
      "1-2 MW spare on the existing plant, confirmed by an account or interconnection record."
     ],
     [
      "10",
      "5 MW or more spare today at an operating plant, confirmed by the utility or the operator."
     ]
    ],
    "metric": "power_headroom",
    "weight": 0.15
   },
   {
    "comment": "POWER AT THE SOURCE, and RESILIENCE folded in. The measured path from generator to rack, in feet. Nothing is lost to transmission and nothing is paid to move it. At the top of this scale on-site generation is the PRIMARY supply rather than the backup, so the line to the property is not the single point of failure.",
    "ladder": [
     [
      "1",
      "No generation on or adjacent to the site. Every electron arrives over somebody else's line."
     ],
     [
      "4",
      "Generation within a few miles, reached over the public distribution system at retail."
     ],
     [
      "7",
      "Generation on the same parcel or adjacent, behind one meter, but the utility line is still the primary supply."
     ],
     [
      "10",
      "Generator to rack measured in feet, on-site generation as PRIMARY supply, the utility line demoted to backup."
     ]
    ],
    "metric": "generation_proximity",
    "weight": 0.13
   },
   {
    "comment": "Lit fiber quality plus the diversity of the second physical path (separate conduit, separate right-of-way). MEASURED 2026-09-16 on run 65 from the Nevada OSIT fiber route inventory: 197 of 210 parcels across 4 grades, instrumented weight 0.57 -> 0.68. THAT SOURCE CANNOT REACH EITHER END OF THIS SCALE, by design. Grade 10 needs separate conduit AND separate rights-of-way; the inventory names a route's owner and never whose trench it shares, so two providers within a mile caps at 7 -- and no parcel in this region reaches even that, because two distinct providers never appear within a mile of one. Grade 1 asserts no lit fiber at the property line; the inventory is the state build programme, not a census of carrier plant, so a parcel with no route within five miles is UNKNOWN and costs the full 0.11, never 1. Only the fiber_redundant screen -- a carrier confirming lit service plus a second path -- can produce a 10 or a 1, and it outranks the route proxy in both directions. FCC Form 477 was tried first and REJECTED: 1 parcel of 210, and nil at TRIC where Switch and Tesla operate, because 477 collects mass-market premises service, not carrier routes.",
    "ladder": [
     [
      "1",
      "No lit fiber at the property line."
     ],
     [
      "4",
      "One lit carrier, single path. An outage on that path is a total outage."
     ],
     [
      "7",
      "Two carriers, but sharing one physical right-of-way for part of the run."
     ],
     [
      "10",
      "Two or more lit carriers on physically separate conduit and separate rights-of-way."
     ]
    ],
    "metric": "fiber_diversity",
    "weight": 0.11
   },
   {
    "comment": "RAPID DEPLOYMENT. Months to energized, and specifically what sits on the critical path: a queue position, new transmission, or utility equipment. What is left when none of those apply is site work and assembly.",
    "ladder": [
     [
      "1",
      "Interconnection queue position required, multi-year, with new transmission on the critical path."
     ],
     [
      "4",
      "No new transmission, but utility equipment with a long lead time is on the critical path."
     ],
     [
      "7",
      "No queue and no new transmission; a utility equipment swap runs parallel to site work."
     ],
     [
      "10",
      "No queue position, no new transmission, no utility equipment on the critical path. Site work and assembly only: months, not years."
     ]
    ],
    "metric": "interconnect_speed",
    "weight": 0.09
   },
   {
    "comment": "How well the by-right use matches, beyond the pass/fail of screen 3. Lyon YLDUSE 500-series = Industrial scores high. An operating industrial plant that already hosts generation is the easy case.",
    "ladder": [
     [
      "1",
      "Use is not contemplated by the code; a rezone would be required."
     ],
     [
      "4",
      "Allowed only by conditional or special use permit, decided at a public hearing."
     ],
     [
      "7",
      "Allowed by right in an industrial district, with conditions on scale or screening."
     ],
     [
      "10",
      "Allowed by right administratively in an industrial district, with no scale cap."
     ]
    ],
    "metric": "zoning_fit",
    "weight": 0.08
   },
   {
    "comment": "Clear height, clean span, floor loading, dock and roof condition. DOWNWEIGHTED in v4 from 0.12: the kit repeats, so a shell is a convenience beside a generator rather than the thing being hunted.",
    "ladder": [
     [
      "1",
      "No structure, or a shell that has to come down."
     ],
     [
      "4",
      "Under 50,000 sf, or clear height under 18 ft, or a span full of columns."
     ],
     [
      "7",
      "100,000-250,000 sf, 24-32 ft clear, clean span, slab adequate."
     ],
     [
      "10",
      "250,000 sf or more, 32 ft or greater clear, clean long span, heavy slab, docks intact."
     ]
    ],
    "metric": "building_shell",
    "weight": 0.08
   },
   {
    "comment": "CLEAN LOAD BY CONSTRUCTION. The facility is carbon-free because of WHERE IT STANDS, not because of a certificate bought to say so. Grades the generation actually behind the meter, not a contracted attribute.",
    "ladder": [
     [
      "1",
      "Coal or oil generation behind the meter, or grid power with no carbon-free source on site."
     ],
     [
      "4",
      "Gas generation on site. Better than the grid on a marginal basis, not carbon-free."
     ],
     [
      "7",
      "Carbon-free generation on site but intermittent, so a carbon-bearing source covers part of the load."
     ],
     [
      "10",
      "Firm carbon-free generation on site covering the load by construction. No certificate involved."
     ]
    ],
    "metric": "carbon_free_source",
    "weight": 0.06
   },
   {
    "comment": "Margin outside the 500-year outline, not merely outside it. Levee-dependent is a fatal screen, not a low score.",
    "ladder": [
     [
      "1",
      "Inside the SFHA, or levee-dependent. This is a fatal screen, not merely a low grade."
     ],
     [
      "4",
      "Outside the SFHA but inside the 500-year outline."
     ],
     [
      "7",
      "Outside the 500-year outline, but close to it or in the same drainage."
     ],
     [
      "10",
      "Well outside the 500-year outline, with elevation margin and no upstream impoundment."
     ]
    ],
    "metric": "flood_position",
    "weight": 0.06
   },
   {
    "comment": "REVENUE FOR THE HOST. What the host's power is worth TODAY without us, which is what makes us a firm buyer worth having. Curtailment volume and weak local pricing are the signal: a plant selling everything at a good price has no reason to talk to us.",
    "ladder": [
     [
      "1",
      "Host is fully contracted at a strong price. No curtailment, no spare offtake, nothing to sell us."
     ],
     [
      "4",
      "Occasional curtailment or a soft hour or two. The gain to the host is real but marginal."
     ],
     [
      "7",
      "Routine curtailment, or output sold into a weak local market well below a firm bilateral price."
     ],
     [
      "10",
      "Heavy curtailment or deeply negative local pricing. A firm buyer beside the generator is transformative for the host."
     ]
    ],
    "metric": "host_revenue_upside",
    "weight": 0.05
   },
   {
    "comment": "Usable acreage for the equipment yard: switchgear, cooling, fuel where it applies, and the setbacks around them.",
    "ladder": [
     [
      "1",
      "No usable yard. Equipment would have to go inside or on the roof."
     ],
     [
      "4",
      "Under 2 usable acres. The core equipment fits; fuel and switchgear setbacks do not."
     ],
     [
      "7",
      "5-10 usable acres: the full equipment yard fits with its setbacks."
     ],
     [
      "10",
      "20 or more usable, level, contiguous acres, with room to repeat the kit."
     ]
    ],
    "metric": "yard_room",
    "weight": 0.05
   },
   {
    "comment": "Phase I findings beyond clean/not-clean: adjacent RECs, EPA FRS neighbours, historical use. A prior informs this grade; only a Phase I decides screen 7.",
    "ladder": [
     [
      "1",
      "Known contamination, open remediation, or a listed site on the parcel."
     ],
     [
      "4",
      "Prior dirty process on the parcel and no Phase I yet: elevated prior."
     ],
     [
      "7",
      "Clean Phase I, but with adjacent RECs or an EPA FRS neighbour."
     ],
     [
      "10",
      "Clean Phase I, no RECs on or adjacent to the parcel, benign process history."
     ]
    ],
    "metric": "environmental",
    "weight": 0.05
   },
   {
    "comment": "Committed water and sewer capacity, and whether a will-serve letter exists.",
    "ladder": [
     [
      "1",
      "No committed water or sewer; an extension would be required."
     ],
     [
      "4",
      "Service exists but capacity is unconfirmed and there is no will-serve letter."
     ],
     [
      "7",
      "Adequate committed capacity; a will-serve letter is obtainable."
     ],
     [
      "10",
      "Written will-serve letter in hand, covering full build-out."
     ]
    ],
    "metric": "water_sewer",
    "weight": 0.04
   },
   {
    "comment": "Heavy-haul route, interstate access, rail spur if present.",
    "ladder": [
     [
      "1",
      "No heavy-haul route: load-restricted bridges or a residential approach."
     ],
     [
      "4",
      "Heavy haul possible, with permits and a detour."
     ],
     [
      "7",
      "Direct heavy-haul route to an interstate within 5 miles."
     ],
     [
      "10",
      "Direct heavy-haul route, interstate within 5 miles, and an active rail spur on site."
     ]
    ],
    "metric": "transport_access",
    "weight": 0.03
   },
   {
    "comment": "Local skilled labour depth and abatement posture. Deliberately the lightest weight: it is the easiest thing to be sold and the hardest to bank.",
    "ladder": [
     [
      "1",
      "No local skilled trades; hostile or absent incentive posture."
     ],
     [
      "4",
      "Thin trades pool; incentives exist but we do not qualify."
     ],
     [
      "7",
      "Adequate electrical and mechanical trades; standard abatements available."
     ],
     [
      "10",
      "Deep trades pool with data centre experience and a signed-off abatement path."
     ]
    ],
    "metric": "labor_and_incentives",
    "weight": 0.02
   }
  ],
  "min_acres": 2.0,
  "min_acres_source": "greenfield.evaluate_parcel min_acres default",
  "name": "Rhode Island, statewide",
  "region": "ri-statewide",
  "scale": {
   "_comment": "1 is the worst defensible state, 10 the best. 1 contributes 0.0.",
   "max": 10,
   "min": 1
  },
  "spare_mw_floors": [
   0.5,
   1.0,
   2.0,
   5.0,
   10.0,
   20.0,
   40.0,
   80.0,
   150.0
  ],
  "state": "RI"
 },
 "tx-statewide": {
  "anchors_declared": 852,
  "bounds_source": "US Census TIGERweb state geometry",
  "excluded": 3,
  "gates": {
   "finalist_count": 20,
   "min_weight_covered": 0.35,
   "min_weighted_score": 0.25,
   "near_miss_score": 0.5
  },
  "greenfield_min_acres": 2.0,
  "jurisdictions": 25,
  "land_classes": [
   "INDUSTRIAL_PARK",
   "INDUSTRIAL_VACANT"
  ],
  "max_miles": 5.0,
  "metrics": [
   {
    "comment": "SPARE GENERATION at the host, in MW, from a utility account record, an interconnection record, or the plant's own written capacity vs output. Redefined in v4: this is spare generation at the plant, not merely deliverable load at a meter, because the thesis buys power at the source. Still the heaviest single weight.",
    "ladder": [
     [
      "1",
      "No generation and no service, or service removed: meter pulled and transformer reclaimed."
     ],
     [
      "4",
      "Under 250 kW spare. A new service study and a queue position are required."
     ],
     [
      "7",
      "1-2 MW spare on the existing plant, confirmed by an account or interconnection record."
     ],
     [
      "10",
      "5 MW or more spare today at an operating plant, confirmed by the utility or the operator."
     ]
    ],
    "metric": "power_headroom",
    "weight": 0.15
   },
   {
    "comment": "POWER AT THE SOURCE, and RESILIENCE folded in. The measured path from generator to rack, in feet. Nothing is lost to transmission and nothing is paid to move it. At the top of this scale on-site generation is the PRIMARY supply rather than the backup, so the line to the property is not the single point of failure.",
    "ladder": [
     [
      "1",
      "No generation on or adjacent to the site. Every electron arrives over somebody else's line."
     ],
     [
      "4",
      "Generation within a few miles, reached over the public distribution system at retail."
     ],
     [
      "7",
      "Generation on the same parcel or adjacent, behind one meter, but the utility line is still the primary supply."
     ],
     [
      "10",
      "Generator to rack measured in feet, on-site generation as PRIMARY supply, the utility line demoted to backup."
     ]
    ],
    "metric": "generation_proximity",
    "weight": 0.13
   },
   {
    "comment": "Lit fiber quality plus the diversity of the second physical path (separate conduit, separate right-of-way). MEASURED 2026-09-16 on run 65 from the Nevada OSIT fiber route inventory: 197 of 210 parcels across 4 grades, instrumented weight 0.57 -> 0.68. THAT SOURCE CANNOT REACH EITHER END OF THIS SCALE, by design. Grade 10 needs separate conduit AND separate rights-of-way; the inventory names a route's owner and never whose trench it shares, so two providers within a mile caps at 7 -- and no parcel in this region reaches even that, because two distinct providers never appear within a mile of one. Grade 1 asserts no lit fiber at the property line; the inventory is the state build programme, not a census of carrier plant, so a parcel with no route within five miles is UNKNOWN and costs the full 0.11, never 1. Only the fiber_redundant screen -- a carrier confirming lit service plus a second path -- can produce a 10 or a 1, and it outranks the route proxy in both directions. FCC Form 477 was tried first and REJECTED: 1 parcel of 210, and nil at TRIC where Switch and Tesla operate, because 477 collects mass-market premises service, not carrier routes.",
    "ladder": [
     [
      "1",
      "No lit fiber at the property line."
     ],
     [
      "4",
      "One lit carrier, single path. An outage on that path is a total outage."
     ],
     [
      "7",
      "Two carriers, but sharing one physical right-of-way for part of the run."
     ],
     [
      "10",
      "Two or more lit carriers on physically separate conduit and separate rights-of-way."
     ]
    ],
    "metric": "fiber_diversity",
    "weight": 0.11
   },
   {
    "comment": "RAPID DEPLOYMENT. Months to energized, and specifically what sits on the critical path: a queue position, new transmission, or utility equipment. What is left when none of those apply is site work and assembly.",
    "ladder": [
     [
      "1",
      "Interconnection queue position required, multi-year, with new transmission on the critical path."
     ],
     [
      "4",
      "No new transmission, but utility equipment with a long lead time is on the critical path."
     ],
     [
      "7",
      "No queue and no new transmission; a utility equipment swap runs parallel to site work."
     ],
     [
      "10",
      "No queue position, no new transmission, no utility equipment on the critical path. Site work and assembly only: months, not years."
     ]
    ],
    "metric": "interconnect_speed",
    "weight": 0.09
   },
   {
    "comment": "How well the by-right use matches, beyond the pass/fail of screen 3. Lyon YLDUSE 500-series = Industrial scores high. An operating industrial plant that already hosts generation is the easy case.",
    "ladder": [
     [
      "1",
      "Use is not contemplated by the code; a rezone would be required."
     ],
     [
      "4",
      "Allowed only by conditional or special use permit, decided at a public hearing."
     ],
     [
      "7",
      "Allowed by right in an industrial district, with conditions on scale or screening."
     ],
     [
      "10",
      "Allowed by right administratively in an industrial district, with no scale cap."
     ]
    ],
    "metric": "zoning_fit",
    "weight": 0.08
   },
   {
    "comment": "Clear height, clean span, floor loading, dock and roof condition. DOWNWEIGHTED in v4 from 0.12: the kit repeats, so a shell is a convenience beside a generator rather than the thing being hunted.",
    "ladder": [
     [
      "1",
      "No structure, or a shell that has to come down."
     ],
     [
      "4",
      "Under 50,000 sf, or clear height under 18 ft, or a span full of columns."
     ],
     [
      "7",
      "100,000-250,000 sf, 24-32 ft clear, clean span, slab adequate."
     ],
     [
      "10",
      "250,000 sf or more, 32 ft or greater clear, clean long span, heavy slab, docks intact."
     ]
    ],
    "metric": "building_shell",
    "weight": 0.08
   },
   {
    "comment": "CLEAN LOAD BY CONSTRUCTION. The facility is carbon-free because of WHERE IT STANDS, not because of a certificate bought to say so. Grades the generation actually behind the meter, not a contracted attribute.",
    "ladder": [
     [
      "1",
      "Coal or oil generation behind the meter, or grid power with no carbon-free source on site."
     ],
     [
      "4",
      "Gas generation on site. Better than the grid on a marginal basis, not carbon-free."
     ],
     [
      "7",
      "Carbon-free generation on site but intermittent, so a carbon-bearing source covers part of the load."
     ],
     [
      "10",
      "Firm carbon-free generation on site covering the load by construction. No certificate involved."
     ]
    ],
    "metric": "carbon_free_source",
    "weight": 0.06
   },
   {
    "comment": "Margin outside the 500-year outline, not merely outside it. Levee-dependent is a fatal screen, not a low score.",
    "ladder": [
     [
      "1",
      "Inside the SFHA, or levee-dependent. This is a fatal screen, not merely a low grade."
     ],
     [
      "4",
      "Outside the SFHA but inside the 500-year outline."
     ],
     [
      "7",
      "Outside the 500-year outline, but close to it or in the same drainage."
     ],
     [
      "10",
      "Well outside the 500-year outline, with elevation margin and no upstream impoundment."
     ]
    ],
    "metric": "flood_position",
    "weight": 0.06
   },
   {
    "comment": "REVENUE FOR THE HOST. What the host's power is worth TODAY without us, which is what makes us a firm buyer worth having. Curtailment volume and weak local pricing are the signal: a plant selling everything at a good price has no reason to talk to us.",
    "ladder": [
     [
      "1",
      "Host is fully contracted at a strong price. No curtailment, no spare offtake, nothing to sell us."
     ],
     [
      "4",
      "Occasional curtailment or a soft hour or two. The gain to the host is real but marginal."
     ],
     [
      "7",
      "Routine curtailment, or output sold into a weak local market well below a firm bilateral price."
     ],
     [
      "10",
      "Heavy curtailment or deeply negative local pricing. A firm buyer beside the generator is transformative for the host."
     ]
    ],
    "metric": "host_revenue_upside",
    "weight": 0.05
   },
   {
    "comment": "Usable acreage for the equipment yard: switchgear, cooling, fuel where it applies, and the setbacks around them.",
    "ladder": [
     [
      "1",
      "No usable yard. Equipment would have to go inside or on the roof."
     ],
     [
      "4",
      "Under 2 usable acres. The core equipment fits; fuel and switchgear setbacks do not."
     ],
     [
      "7",
      "5-10 usable acres: the full equipment yard fits with its setbacks."
     ],
     [
      "10",
      "20 or more usable, level, contiguous acres, with room to repeat the kit."
     ]
    ],
    "metric": "yard_room",
    "weight": 0.05
   },
   {
    "comment": "Phase I findings beyond clean/not-clean: adjacent RECs, EPA FRS neighbours, historical use. A prior informs this grade; only a Phase I decides screen 7.",
    "ladder": [
     [
      "1",
      "Known contamination, open remediation, or a listed site on the parcel."
     ],
     [
      "4",
      "Prior dirty process on the parcel and no Phase I yet: elevated prior."
     ],
     [
      "7",
      "Clean Phase I, but with adjacent RECs or an EPA FRS neighbour."
     ],
     [
      "10",
      "Clean Phase I, no RECs on or adjacent to the parcel, benign process history."
     ]
    ],
    "metric": "environmental",
    "weight": 0.05
   },
   {
    "comment": "Committed water and sewer capacity, and whether a will-serve letter exists.",
    "ladder": [
     [
      "1",
      "No committed water or sewer; an extension would be required."
     ],
     [
      "4",
      "Service exists but capacity is unconfirmed and there is no will-serve letter."
     ],
     [
      "7",
      "Adequate committed capacity; a will-serve letter is obtainable."
     ],
     [
      "10",
      "Written will-serve letter in hand, covering full build-out."
     ]
    ],
    "metric": "water_sewer",
    "weight": 0.04
   },
   {
    "comment": "Heavy-haul route, interstate access, rail spur if present.",
    "ladder": [
     [
      "1",
      "No heavy-haul route: load-restricted bridges or a residential approach."
     ],
     [
      "4",
      "Heavy haul possible, with permits and a detour."
     ],
     [
      "7",
      "Direct heavy-haul route to an interstate within 5 miles."
     ],
     [
      "10",
      "Direct heavy-haul route, interstate within 5 miles, and an active rail spur on site."
     ]
    ],
    "metric": "transport_access",
    "weight": 0.03
   },
   {
    "comment": "Local skilled labour depth and abatement posture. Deliberately the lightest weight: it is the easiest thing to be sold and the hardest to bank.",
    "ladder": [
     [
      "1",
      "No local skilled trades; hostile or absent incentive posture."
     ],
     [
      "4",
      "Thin trades pool; incentives exist but we do not qualify."
     ],
     [
      "7",
      "Adequate electrical and mechanical trades; standard abatements available."
     ],
     [
      "10",
      "Deep trades pool with data centre experience and a signed-off abatement path."
     ]
    ],
    "metric": "labor_and_incentives",
    "weight": 0.02
   }
  ],
  "min_acres": 2.0,
  "min_acres_source": "greenfield.evaluate_parcel min_acres default",
  "name": "Texas, statewide",
  "region": "tx-statewide",
  "scale": {
   "_comment": "1 is the worst defensible state, 10 the best. 1 contributes 0.0.",
   "max": 10,
   "min": 1
  },
  "spare_mw_floors": [
   0.5,
   1.0,
   2.0,
   5.0,
   10.0,
   20.0,
   40.0,
   80.0,
   150.0
  ],
  "state": "TX"
 }
};
