
#version 330 core
out vec4 color;

in vec3 FragPos;  
in vec3 Normal;  
  
uniform vec3 lightPos; 
uniform vec3 viewPos;
uniform vec3 lightColor;
uniform vec3 objectColor;

void main()
{
    // Ambient: the light surrounding the whole room.(always exist)
    float ambientStrength = 0.1f;     //syntax constraints, must be a float
    vec3 ambient = ambientStrength * lightColor;	//ambient lighting also depends on light color.
  	
    // Diffuse: light doesn't directly points to the cube 
    vec3 norm = normalize(Normal);
    vec3 lightDir = normalize(lightPos - FragPos);	//direction the light points
    float diff = max(dot(norm, lightDir), 0.0);		//there won't be diffuse light if light source cannot reach there, then strength = 0
    vec3 diffuse = diff * lightColor;			//reflected light color should looks same 
    
    // Specular: light directly points to the cube
    float specularStrength = 2.0f;
    vec3 viewDir = normalize(viewPos - FragPos);	//direction of the light
    vec3 reflectDir = reflect(-lightDir, norm);  	//unlike diffuse, specular light has a very strong direction
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32);	//Specular light only appear when light source straignt hit the cube
    vec3 specular = specularStrength * spec * lightColor;  

    color = vec4((ambient + diffuse + specular)*objectColor, 1.0f);    //Phong shading: light is combined by ambient and diffuse and specular
} 
