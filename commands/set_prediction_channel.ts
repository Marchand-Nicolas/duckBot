import Discord, {
  CommandInteraction,
  Interaction,
  TextChannel,
} from "discord.js";
import writeConfig from "../utils/writeConfig";

const setPredictionChannel = async (interaction: CommandInteraction) => {
  const channel = interaction.options.get("channel")?.channel as TextChannel;
  if (!channel) {
    await interaction.reply({
      content: "Channel not found",
      ephemeral: true,
    });
    return;
  }
  // Check the channel is a text channel
  if (channel.type !== Discord.ChannelType.GuildText) {
    await interaction.reply({
      content: "Channel must be a text channel",
      ephemeral: true,
    });
    return;
  }

  const message = await channel.send(
    "This message is going to contain predictions. Please do not delete it"
  );
  await message.pin();
  writeConfig("predictionMessageId", message.id);
  await interaction.reply({
    content: `Prediction channel set to ${channel}`,
    ephemeral: true,
  });
};

module.exports = {
  name: "set-prediction-channel",
  description: "Sets the channel for predictions",
  execute: setPredictionChannel,
  options: [
    {
      name: "channel",
      description: "The channel to set",
      type: 7,
      required: true,
    },
  ],
};
