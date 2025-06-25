export default {
  register() {},
  
  async bootstrap({ strapi }) {
    console.log('🚀 Running bootstrap to set up permissions...');
    
    try {
      // Check if we need to create permissions
      const publicRole = await strapi.entityService.findMany(
        'plugin::users-permissions.role',
        {
          filters: { type: 'public' }
        }
      );

      if (publicRole && publicRole.length > 0) {
        const publicRoleId = publicRole[0].id;
        console.log(`📝 Found public role with ID: ${publicRoleId}`);

        // Define the permissions we want to set
        const permissionsToCreate = [
          // Posts permissions
          { action: 'api::post.post.find', role: publicRoleId },
          { action: 'api::post.post.findOne', role: publicRoleId },
          
          // Tags permissions  
          { action: 'api::tag.tag.find', role: publicRoleId },
          { action: 'api::tag.tag.findOne', role: publicRoleId },
          
          // Site setting permissions
          { action: 'api::site-setting.site-setting.find', role: publicRoleId },
          
          // About page permissions
          { action: 'api::about-page.about-page.find', role: publicRoleId },
          
          // Upload permissions for images
          { action: 'plugin::upload.file.find', role: publicRoleId },
          { action: 'plugin::upload.file.findOne', role: publicRoleId },
        ];

        // Check and create permissions
        for (const permission of permissionsToCreate) {
          const existingPermission = await strapi.entityService.findMany(
            'plugin::users-permissions.permission',
            {
              filters: {
                action: permission.action,
                role: permission.role
              }
            }
          );

          if (!existingPermission || existingPermission.length === 0) {
            try {
              await strapi.entityService.create(
                'plugin::users-permissions.permission',
                {
                  data: permission
                }
              );
              console.log(`✅ Created permission: ${permission.action}`);
            } catch (error) {
              console.log(`⚠️ Could not create permission ${permission.action}:`, error.message);
            }
          } else {
            console.log(`✅ Permission already exists: ${permission.action}`);
          }
        }
        
        console.log('🎉 Bootstrap permissions setup completed!');
      } else {
        console.log('❌ Could not find public role');
      }
    } catch (error) {
      console.log('❌ Bootstrap error:', error.message);
    }
  }
}; 