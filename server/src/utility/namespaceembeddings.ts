import { createEmbeddingService } from "../Services/createEmbeddigService";
import fs from "fs";
import path from "path";

const keywords_one = `biomechanics | kinematics | kinetics | joint angles | joint torque | range of motion |
gait analysis | stride length | ground reaction force | force plate | moment arm |
muscle activation | electromyography | emg analysis | muscle force | muscle stiffness |
tendon stiffness | tendon elasticity | muscle architecture | fascicle length |
pennation angle | muscle fiber type | muscle contraction | eccentric loading |
concentric loading | isometric contraction | movement efficiency | motor control |
neuromechanics | proprioception | balance control | postural sway | center of pressure |
center of mass | movement variability | reaction time | coordination |
force–velocity relationship | length–tension relationship | biomechanical modelling |
inverse dynamics | forward dynamics | segmental analysis | anthropometry |
body segmentation | body proportions | skeletal alignment | posture analysis |
spine biomechanics | lumbar biomechanics | knee biomechanics | hip biomechanics |
shoulder biomechanics | foot mechanics | plantar pressure | arch mechanics |
impact forces | shock absorption | load distribution | movement asymmetry |
jump mechanics | landing mechanics | squat mechanics | lifting mechanics |
running mechanics | sprint mechanics | throwing mechanics | rotational mechanics |
ergonomics | workplace biomechanics | mechanical stress | tissue loading |
injury biomechanics | movement screening | functional movement |
biomechanical efficiency | sport biomechanics`;

const keywords_two = `nutrition | diet | macronutrients | micronutrients |
protein intake | carbohydrates | dietary fats | fiber intake |
calorie intake | energy balance | caloric deficit | caloric surplus |
metabolism | resting metabolic rate | thermic effect of food |
glycemic index | insulin response | blood sugar regulation |
nutrient timing | pre workout nutrition | post workout nutrition |
hydration | electrolytes | sodium intake | potassium intake |
vitamin d | vitamin b12 | folate | omega 3 |
fatty acids | antioxidants | polyphenols |
amino acids | branched chain amino acids | leucine | creatine |
beta alanine | caffeine | nitrate supplementation |
protein powder | whey protein | casein protein |
plant protein | soy protein | pea protein |
meal frequency | intermittent fasting | time restricted eating |
low carbohydrate diet | ketogenic diet | high protein diet |
plant based diet | mediterranean diet | balanced diet |
antioxidant intake | micronutrient deficiency |
iron deficiency | calcium intake | magnesium intake |
gut health | probiotics | prebiotics | digestive enzymes |
satiety | appetite regulation | hunger hormones |
ghrelin | leptin | nutrient absorption |
food quality | processed foods | whole foods |
performance nutrition | sports supplementation |
muscle protein synthesis | protein distribution |
recovery nutrition | carbohydrate loading |
hydration strategies | ergogenic aids`;

const keywords_three = `muscle recovery | muscle repair | muscle damage |
delayed onset muscle soreness | DOMS |
fatigue management | training fatigue |
central fatigue | peripheral fatigue |
adaptation | physiological adaptation | training adaptation |
supercompensation | progressive overload |
overtraining | overreaching | recovery capacity |
rest intervals | sleep quality | sleep duration |
sleep deprivation | circadian rhythm |
stress recovery | stress management | cortisol levels |
inflammation | anti inflammatory response |
oxidative stress | cellular repair |
protein synthesis | muscle protein synthesis |
connective tissue healing | tendon recovery | ligament recovery |
injury prevention | injury risk | injury rehabilitation |
soft tissue injury | strain injury | sprain injury |
mobility training | flexibility training |
foam rolling | self myofascial release |
massage therapy | cold therapy | ice bath |
cryotherapy | heat therapy | contrast therapy |
compression therapy | pneumatic compression |
recovery modalities | active recovery |
passive recovery | deload week |
heart rate variability | HRV monitoring |
readiness to train | training load |
chronic load | acute load |
acute chronic workload ratio | ACWR |
tissue remodeling | muscle hypertrophy |
fatigue resistance | neuromuscular recovery |
energy restoration | glycogen resynthesis |
electrolyte restoration | rehabilitation exercise |
return to training | return to sport |
pain management | movement dysfunction |
biomechanical compensation | post exercise recovery |
fatigue monitoring | readiness score |
load management | training stress balance |
immune function | immune suppression |
cellular adaptation | systemic recovery |
high intensity recovery | strength recovery |
neuromuscular fatigue | muscle stiffness |
range of motion restoration | tissue healing |
exercise induced muscle damage | EIMD`;

const keywords_four = `cardiovascular fitness | aerobic fitness | anaerobic fitness |
endurance training | aerobic endurance | muscular endurance |
cardiorespiratory endurance | VO2 max | VO2 peak |
oxygen uptake | oxygen utilization | ventilatory threshold |
lactate threshold | anaerobic threshold | lactate clearance |
running economy | cycling economy |
cardiac output | stroke volume | heart rate |
resting heart rate | maximum heart rate | heart rate reserve |
target heart rate | heart rate zones |
zone 2 training | steady state cardio |
high intensity interval training | HIIT |
interval training | long slow distance training |
metabolic conditioning | metcon |
energy systems | aerobic metabolism | anaerobic metabolism |
glycogen utilization | fat oxidation |
fat adaptation | carb oxidation |
respiratory rate | ventilation |
cardiovascular adaptation | training adaptation |
endurance adaptation | mitochondrial density |
capillary density | mitochondrial biogenesis |
blood flow | vascular function |
arterial stiffness | endothelial function |
cardiorespiratory response | oxygen delivery |
exercise capacity | work capacity |
running performance | cycling performance |
rowing endurance | swimming endurance |
aerobic base | base training |
fatigue resistance | cardiac efficiency |
energy expenditure | caloric burn |
time to exhaustion | critical speed | critical power |
training load | endurance workload |
recovery heart rate | exercise tolerance |
blood lactate | metabolic efficiency |
aerobic intervals | tempo training |
threshold training | VO2 max intervals |
oxygen kinetics | respiratory efficiency`;

// export const get_embeddings = async () => {
//   let existing = {};

//   const filePath = path.join(__dirname, "namespace_embeddings.json");

//   if (fs.existsSync(filePath)) {
//     existing = JSON.parse(fs.readFileSync(filePath, "utf-8"));
//   }

//   const namespace_two_embeddings = await createEmbeddingService(keywords_two);

//   const namespace_three_embeddings = await createEmbeddingService(
//     keywords_three
//   );
//   const namespace_four_embeddings = await createEmbeddingService(keywords_four);
//     const namespace_five_embeddings = await createEmbeddingService(keywords_five);

//   const updatedData = {
//     ...existing,
//     namespace_one: namespace_one_embeddings,
//     namespace_two: namespace_two_embeddings,
//     namespace_three_embeddings: namespace_three_embeddings,
//     namespace_four_embeddings: namespace_four_embeddings,
//   };

//   fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
// };

// get_embeddings();

// const namespace_two_embeddings = createEmbeddingService();
// const namespace_three_embeddings = createEmbeddingService();
// const namespace_four_embeddings = createEmbeddingService();
